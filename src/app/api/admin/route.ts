import { currentServerUserRoles } from "@/lib/auth-session";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(request: Request, response: Response) {
    
    const role = await currentServerUserRoles();

    if(!role || role !== UserRole.ADMIN ){
        return new NextResponse(null, {status: 403});
    }

    return new NextResponse(null, {status: 200});
}