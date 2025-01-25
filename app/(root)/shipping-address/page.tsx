import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shipping-address-form";
import { ShippingAddressType } from "@/types";
import CheckoutSteps from "@/components/share/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping Address",
};

export default async function ShippingAddress() {
  const cart = await getMyCart();
  const session = await auth();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const userId = session?.user?.id;

  if (!userId) throw new Error("User ID not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddressType} />;
    </>
  );
}
