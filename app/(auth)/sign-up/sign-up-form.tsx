"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signUpDefaultValues } from "@/lib/constants";
import { signUpUser } from "@/lib/actions/user.actions";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";

export default function SignUpForm() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button
        variant={"default"}
        type="submit"
        className="w-full"
        disabled={pending}
      >
        {pending ? "submitting..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={signUpDefaultValues.name}
        />
      </div>
      <div className="mt-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={signUpDefaultValues.email}
          />
        </div>
      </div>
      <div className="mt-3">
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
            defaultValue={signUpDefaultValues.password}
          />
        </div>
      </div>
      <div className="mt-3">
        <div>
          <Label htmlFor="confirmPassword">ConfirmPassword</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={signUpDefaultValues.confirmPassword}
          />
        </div>
      </div>
      <div className="mt-4">
        <SignUpButton />
      </div>

      {data && !data.success && (
        <div className="mt-3 font-semibold text-center text-destructive">
          {data.message}
        </div>
      )}

      <div className="mt-2 text-center text-muted-foreground text-sm">
        Already have an account?{" "}
        <Badge className="mt-4 ml-2 capitalize" variant={"outline"}>
          <Link href={"/sign-in"} target="_self" className="capitalize link">
            Sign In
          </Link>
        </Badge>
      </div>
    </form>
  );
}
