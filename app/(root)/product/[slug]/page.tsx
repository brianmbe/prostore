import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductPrice from "@/components/share/product/product-price";
import { Button } from "@/components/ui/button";
import ProductImages from "@/components/share/product/product-images";
import PreviousPage from "@/components/share/previouspage/previous-page";

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section>
      <div className="mb-2">
        <PreviousPage />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images */}
        <ProductImages images={product.images} />

        {/* Details column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <p className="text-gray-500 text-sm">
              Category: {product.category} &gt; {product.brand}
            </p>
            <div className="flex gap-3">
              <Badge>{product.category}</Badge>
              <Badge
                className={`${!product.featured ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"}`}
              >
                {product.isFeatured ? "Top Deal" : "Featured"}
              </Badge>
            </div>
            <h1 className="h3-bold">{product.name}</h1>
            <p>{<Badge>Brand: {product.brand}</Badge>}</p>
            <p>
              {product.rating} of {product.numReviews} Revies
            </p>
            <div className="flex sm:flex-row flex-col sm:items-center gap-3">
              <ProductPrice
                value={Number(product.price)}
                className="bg-green-100 px-7 py-1 rounded-full w-24 text-green-700"
              />
              <p>{product.stock} in stock</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-semibold">Description:</p>
            <p>{product.description}</p>
          </div>
        </div>

        {/* Action column */}
        <div className="col-span-1">
          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500">Price:</p>
                <ProductPrice
                  value={Number(product.price)}
                  className="text-xl"
                />
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500">Status:</p>
                <p>
                  {product.stock > 0 ? (
                    <Badge variant={"outline"}>In stock</Badge>
                  ) : (
                    <Badge variant={"destructive"}>Out stock</Badge>
                  )}
                </p>
              </div>
              {product.stock > 0 && (
                <Button className="w-full btn-primary">Add to cart</Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
