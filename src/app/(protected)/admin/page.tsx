"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import RoleGate from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { isUserAdmin } from "@/actions/auth.action";


export default function AdminPage() {

  const onApiRouteClick = async () => {
    try {
      const res = await fetch('/api/admin');
      if (!res.ok) {
        toast.error("Not allowed")
        return;
      }
      toast.success("All ok")

    } catch (error) {
      console.log(error)
    }
  }

  const onServerActionClick = async () => {
    const isAdmin = await isUserAdmin();
    if( isAdmin.status === "forbidden") {
      toast.error(isAdmin.message);
      return;
    }
    toast.success("All ok")
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Admin</CardTitle>
          <CardDescription>This is the administration page</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleGate allowedRoles={[UserRole.ADMIN]}>
            <div className="space-y-4">
              <div className="flex items-center justify-between border p-3 shadow-md rounded">
                <p>Admin-only API Route</p>
                <Button onClick={onApiRouteClick}>Click to test</Button>
              </div>
              <div className="flex items-center justify-between border p-3 shadow-md rounded">
                <p>Admin-only Server action</p>
                <Button onClick={onServerActionClick}>Click to test</Button>
              </div>
            </div>
          </RoleGate>
        </CardContent>
      </Card>

    </div>
  )
}
