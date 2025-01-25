import { auth } from "@/auth";
import CheckoutSteps from "@/components/share/checkout-steps";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import PaymentmethodForm from "./payment-mtd-form";

export const metadata: Metadata = {
  title: "Payment Method",
};

export default async function PaymentMethod() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return (
    <>
      <CheckoutSteps current={2} />
      {user && <PaymentmethodForm preferedPaymentMethod={user.paymentMethod} />}
    </>
  );
}
