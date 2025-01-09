"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInDefaultValues } from "@/lib/constants";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

export default function CredentialsSignInForm() {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        variant={"default"}
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={signInDefaultValues.email}
        />
      </div>
      <div className="space-y-2 mt-3">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="password"
          defaultValue={signInDefaultValues.password}
        />
      </div>
      <div className="mt-4">
        <SignInButton />
      </div>

      {data && !data.success && (
        <div className="mt-3 font-semibold text-center text-destructive">
          {data.message}
        </div>
      )}

      <div className="mt-2 text-center text-muted-foreground text-sm">
        Don&apos;t have an account?{" "}
        <Badge className="mt-4 ml-2 capitalize" variant={"outline"}>
          <Link href={"/sign-up"} target="_self" className="capitalize link">
            Sign up
          </Link>
        </Badge>
      </div>
    </form>
  );
}
