"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { CartItem } from "@/types";
import { addItemToCart } from "@/lib/actions/cart.actions";

export default function AddToCart({ item }: { item: CartItem }) {
  const router = useRouter();
  const { toast } = useToast();

  async function HandleAddToCart() {
    const response = await addItemToCart(item);

    if (!response.success) {
      toast({
        variant: "destructive",
        description: response.message,
      });
      return;
    }

    // handle success add to cart
    toast({
      description: `${item.name} successfully added to cart`,
      action: (
        <ToastAction altText="Go to cart" onClick={() => router.push("/cart")}>
          Go To Cart
        </ToastAction>
      ),
    });
  }

  return (
    <Button
      className="w-full btn-primary"
      type="button"
      onClick={HandleAddToCart}
    >
      <Plus /> Add to cart
    </Button>
  );
}
