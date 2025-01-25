import CheckoutSteps from "@/components/share/checkout-steps";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Method",
};

export default function PaymentMethod() {
  return (
    <>
      <CheckoutSteps current={2} />
      <div>Payment Method</div>
    </>
  );
}
