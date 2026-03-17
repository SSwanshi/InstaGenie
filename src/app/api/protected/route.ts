import { getUserFromRequest } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user";

export async function GET(req: Request) {
  try {
    const user = getUserFromRequest(req);

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    await connectDB();
    const userData = await User.findById(user.userId).select("-password");

    if (!userData) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return Response.json({
      message: "Successfully fetched user data",
      user: userData,
    });
  } catch (error) {
    console.error("Protected route error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}