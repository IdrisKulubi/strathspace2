import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AuthDashboard } from "@/app/components/auth/auth-dashboard";

export default async function AuthAdminPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is authenticated and has admin role
  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Your role: {session.user.role || "user"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <AuthDashboard />
    </div>
  );
}
