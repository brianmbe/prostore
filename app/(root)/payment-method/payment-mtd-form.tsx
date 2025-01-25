"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentMethodSchema } from "@/lib/validators";
import { DEFAULT_PAYMENT_METHOD } from "@/types";

export default function PaymentmethodForm({
  preferedPaymentMethod,
}: {
  preferedPaymentMethod: string | null;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferedPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  return <div>{preferedPaymentMethod}</div>;
}
