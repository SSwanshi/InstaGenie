import { loginUser } from "@/controllers/authController";

export async function POST(req : Request){
    return loginUser(req);
}