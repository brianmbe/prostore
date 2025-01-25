import React from "react";
import { cn } from "@/lib/utils";

export default function CheckoutSteps({ current = 0 }) {
  return (
    <div className="md:flex-row flex-col flex-between space-x-2 space-y-2 mb-10">
      {["User Login", "Shipping Address", "Payment Mehtod", "Place Order"].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                "p-2 w-56 rounded-full text-center text-sm",
                index === current ? "bg-secondary font-bold" : ""
              )}
            >
              {step}
            </div>
            {step !== "Place Order" && (
              <hr className="border-gray-300 mx-2 border-t w-16" />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
}
