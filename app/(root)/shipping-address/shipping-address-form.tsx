"use client";

import { useToast } from "@/hooks/use-toast";
import { ShippingAddressType } from "@/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function ShippingAddressForm(address: ShippingAddressType) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return <div>shipping-address-form</div>;
}
