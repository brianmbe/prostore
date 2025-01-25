"use client";

import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

import { Cart } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowBigRight, Loader, Minus, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import PreviousPage from "@/components/share/previouspage/previous-page";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";

export default function CartTable({ cart }: { cart?: Cart }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {!cart || cart.items.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/images/logo.svg"
            alt={APP_NAME}
            width={70}
            height={70}
            priority={true}
          />
          <div className="shadow-md p-6 rounded-lg w-1/3 text-center"></div>
          <h1 className="mt-4 mb-4 font-bold text-3xl capitalize">
            Cart is empty
          </h1>
          <p>
            Your Cart is empty.{" "}
            <Badge>
              <Link href={"/"}>Go Shopping</Link>
            </Badge>
          </p>
          <PreviousPage />
        </div>
      ) : (
        <>
          <h1 className="py-4 capitalize h2-bold">
            Shopping cart - ({cart.items.reduce((a, c) => a + c.qty, 0)})
          </h1>

          <div className="md:gap-5 grid md:grid-cols-4">
            <div className="md:col-span-3 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="font-bold capitalize">
                    <TableHead>item</TableHead>
                    <TableHead className="text-center">quantity</TableHead>
                    <TableHead className="text-right">price</TableHead>
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
                            height={50}
                            width={50}
                          />
                          <span className="px-2">{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell className="flex-center gap-2">
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await removeItemFromCart(
                                item.product_id
                              );

                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Minus className="w-4 h-4" />
                          )}
                        </Button>
                        {item.qty}
                        <Button
                          disabled={isPending}
                          variant={"outline"}
                          type="button"
                          onClick={() =>
                            startTransition(async () => {
                              const res = await addItemToCart(item);

                              if (!res.success) {
                                toast({
                                  variant: "destructive",
                                  description: res.message,
                                });
                              }
                            })
                          }
                        >
                          {isPending ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Card>
              <CardContent className="gap-4 p-4">
                <p className="mb-3 capitalize">Cart Summary</p>
                <div className="text-right pb-3 text-xl">
                  Price:{" "}
                  <span className="font-bold">
                    {formatCurrency(cart.itemsPrice)}
                  </span>
                </div>
                <div className="text-right pb-3 text-xs">
                  Shipping fee:{" "}
                  <span>{formatCurrency(cart.shippingPrice)}</span>
                </div>
                <div className="text-right pb-3 text-xs">
                  Tax fee: <span>{formatCurrency(cart.taxPrice)}</span>
                </div>
                <Button
                  className="w-full font-bold capitalize"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(() => {
                      router.push("/shipping-address");
                    })
                  }
                >
                  {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowBigRight className="w-4 h-4" />
                  )}{" "}
                  checkout ({formatCurrency(cart.totalPrice)})
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
