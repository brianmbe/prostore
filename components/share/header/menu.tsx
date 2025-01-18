import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingBasket } from "lucide-react";

import ModeToggle from "./Mode-toggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserButton from "./user-button";

export default function Menu() {
  return (
    <div className="flex justify-end gap-3">
      <nav className="md:flex gap-1 hidden w-full max-w-xs">
        <ModeToggle />
        <Button asChild variant={"ghost"}>
          <Link href="/cart">
            <ShoppingBasket /> Cart
          </Link>
        </Button>
        <UserButton />
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant={"ghost"}>
              <Link href="/cart">
                <ShoppingBasket /> Cart
              </Link>
            </Button>
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
