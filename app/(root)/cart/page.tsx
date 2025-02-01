import { Metadata } from "next";

import { getMyCart } from "@/lib/actions/cart.actions";
import CartTable from "./cart-table";
import CheckoutSteps from "@/components/share/checkout-steps";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function Cart() {
  const cart = await getMyCart();

  return (
    <>
      <CheckoutSteps current={0} />
      <CartTable cart={cart} />
    </>
  );
}
