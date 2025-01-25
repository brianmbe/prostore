import { product_price_discount } from "@/lib/constants";
import { cn, formatCurrency } from "@/lib/utils";
import { Product } from "@/types";

export default function ProductPrice({
  value,
  className,
  product,
}: {
  value: number;
  className?: string;
  product: Product;
}) {
  const fixedDiscount = Math.ceil(product_price_discount);
  const fixedPrice = Math.round(value);

  return (
    <div className="flex flex-col items-start space-y-2 overflow-hidden">
      <div className="flex flex-row flex-between gap-1">
        {/* Discounted Price */}
        <span className={cn("text-2xl", className)}>
          {formatCurrency(fixedPrice)}
        </span>

        {/* Original Price */}
        <span className="text-gray-500 line-through">
          {formatCurrency(fixedPrice * fixedDiscount)}
        </span>
      </div>

      {/* Items Left */}
      <span className="text-gray-700 text-sm">{product?.stock} items left</span>

      {/* Progress Bar */}
      <div className="hover:hidden bg-gray-300 rounded-full w-full h-2">
        <div
          // className={`${product?.stock > 0 ? "bg-orange-600" : "bg-orange-600"}`}
          className={`${product.stock > 0 ? `${product.stock < 10 ? "bg-red-600" : "bg-orange-500"}` : ""} rounded-full h-2`}
          style={{ width: `${(product?.purchased / product?.stock) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
