"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader, Check } from "lucide-react";

import { createorder } from "@/lib/actions/order.actions";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await createorder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  const PlaceOrderBtn = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full capitalize">
        {pending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}{" "}
        {pending ? "Placing your order..." : "place Order"}
      </Button>
    );
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderBtn />
    </form>
  );
};

export default PlaceOrderForm;
