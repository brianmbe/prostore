import { UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/user.actions";
import { auth } from "@/auth";

export default async function UserButton() {
  const session = await auth();
  const firstInitial = session?.user?.name?.charAt(0).toUpperCase() ?? "You";

  if (!session) {
    return (
      <Button asChild>
        <Link href={"/sign-in"}>
          <UserIcon /> Sign in
        </Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant={"default"}
              className="relative flex justify-center items-center ml-2 rounded-full w-8 h-8"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="font-medium text-sm leading-none">
                {session.user?.name}
              </div>
              <div className="text-muted-foreground text-sm leading-none">
                {session.user?.email}
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem className="mb-1 p-0">
            <form action={signOutUser} className="w-full">
              <Button
                className="justify-center mt-3 px-2 py-4 w-full h-4"
                variant={"default"}
              >
                Sign Out
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
