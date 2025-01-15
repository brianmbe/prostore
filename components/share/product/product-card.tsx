import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center p-0">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <CardContent className="gap-4 grid p-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="font-bold">
            {product.brand} {product.name}
          </h2>
        </Link>
        <div className="flex-between gap-4">
          {/* <p>{product.rating} Stars</p> */}
          {product.stock > 0 ? (
            <ProductPrice value={+product.price} product={product} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
