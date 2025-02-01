import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { ShippingAddressType } from "@/types";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import PlaceOrderForm from "./place-order-form";
import CheckoutSteps from "@/components/share/checkout-steps";

export const metadata: Metadata = {
  title: "Place Order",
};

export default async function PlaceOrderPage() {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user found");

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddressType;
  return (
    <>
      <CheckoutSteps current={3} />

      <h1 className="py-4 font-bold text-2xl capitalize">
        Complete your order
      </h1>
      <div className="md:gap-5 grid md:grid-cols-3">
        <div className="space-y-4 md:col-span-2 overflow-x-auto">
          <Card>
            <CardContent className="gap-5 p-4">
              <h2 className="pb-4 font-bold text-xl capitalize">items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.items.map((item) => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="px-2">{item.qty}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="gap-5 p-4">
              <h2 className="pb-4 font-bold text-xl capitalize">
                Shipping address
              </h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city}{" "}
              </p>
              <p>
                {userAddress.postalCode}, {userAddress.country}{" "}
              </p>
              <div className="mt-3">
                <Link href={"shipping-address"}>
                  <Button>Edit your address</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="gap-5 p-4">
              <h2 className="pb-4 font-bold text-xl capitalize">
                Payment method
              </h2>
              <p>{user.paymentMethod}</p>

              <div className="mt-3">
                <Link href={"payment-method"}>
                  <Button>Edit payment method</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment summary */}
        <div className="">
          <Card>
            <CardContent className="gap-4 p-4">
              <h2 className="pb-4 font-bold text-xl capitalize">
                Order summary
              </h2>
              <div className="flex justify-between">
                <div>Price</div>
                <div className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </div>
              </div>
              <div className="flex justify-between">
                <div>Tax fees</div>
                <div className="text-sm">{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping fee</div>
                <div className="text-sm">
                  {formatCurrency(cart.shippingPrice)}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="capitalize">Total Price</div>
                <div className="font-bold text-xl">
                  {formatCurrency(cart.totalPrice)}
                </div>
              </div>

              <PlaceOrderForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
