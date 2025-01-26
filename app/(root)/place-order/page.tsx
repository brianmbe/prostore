import { Metadata } from "next";

import CheckoutSteps from "@/components/share/checkout-steps";

export const metadata: Metadata = {
  title: "Place Order",
};

export default function PlaceOrderPage() {
  return (
    <>
      {" "}
      <CheckoutSteps current={3} />
      <div>Place Order</div>
    </>
  );
}
