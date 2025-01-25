"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ShoppingCart, Minus, Plus, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

export default function AddToCart({
  item,
  cart,
}: {
  item: CartItem;
  cart?: Cart;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  async function HandleAddToCart() {
    startTransition(async () => {
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
        description: response.message,
        action: (
          <ToastAction
            altText="Go to cart"
            onClick={() => router.push("/cart")}
          >
            Go To Cart
          </ToastAction>
        ),
      });
    });
  }

  // handle remove from cart
  async function handleRemoveFromCart() {
    startTransition(async () => {
      const response = await removeItemFromCart(item.product_id);

      toast({
        variant: response.success ? "default" : "destructive",
        description: response.message,
      });

      return;
    });
  }

  //  check if in cart
  const itemExist =
    cart && cart.items.find((x) => x.product_id === item.product_id);

  return itemExist ? (
    <div className="flex-center items-center mt-3">
      <Button type="button" variant={"outline"} onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
      </Button>
      <span className="px-2">{itemExist.qty}</span>
      <Button type="button" variant={"outline"} onClick={HandleAddToCart}>
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full btn-primary"
      type="button"
      onClick={HandleAddToCart}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <ShoppingCart />
      )}{" "}
      Add to cart
    </Button>
  );
}
