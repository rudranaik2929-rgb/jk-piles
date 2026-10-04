"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { ROLE_LABELS } from "@/lib/types";
import { DEMO_USERS, APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HardHat } from "lucide-react";

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  const handleLogin = (userId: string) => {
    login(userId);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
          <HardHat size={32} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{APP_NAME}</h1>
        <p className="mt-2 text-slate-500">{APP_TAGLINE}</p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="text-center pb-2">
          <CardTitle>Demo Login</CardTitle>
          <CardDescription>Select a role to experience the system</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 pt-4">
          {DEMO_USERS.map((demoUser) => (
            <Button
              key={demoUser.userId}
              variant="outline"
              className="h-auto w-full justify-start p-4 hover:border-blue-600 hover:bg-blue-50/50 hover:text-blue-700"
              onClick={() => handleLogin(demoUser.userId)}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="font-semibold">{demoUser.name}</span>
                <span className="text-xs text-slate-500 font-normal">
                  Role: {ROLE_LABELS[demoUser.role]}
                </span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
      
      <p className="mt-12 text-sm text-slate-400">
        Powered by Zenoflow
      </p>
    </div>
  );
}
