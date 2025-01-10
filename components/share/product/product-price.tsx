import { dollarRate } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ProductPrice({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  // Ensure 2 decimal placess
  const formattedPrice = value.toFixed(2);
  // Add commas for thousands
  const priceWithCommas = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // get the int/float
  const [intValue] = priceWithCommas.split(".");

  return (
    <p className={cn("text-2xl", className)}>
      <span className="font-bold text-lg">UGX {+intValue * dollarRate}</span>
      {/* <span className="text-xs align-super">.{floatValue}</span> */}
    </p>
  );
}
