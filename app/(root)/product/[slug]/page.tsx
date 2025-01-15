import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { getProductBySlug } from "@/lib/actions/product.actions";
import ProductPrice from "@/components/share/product/product-price";
import ProductImages from "@/components/share/product/product-images";
import AddToCart from "@/components/share/product/add-to-cart";

export default async function ProductDetailsPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        {/* <PreviousPage /> */}
        <p className="text-gray-300 text-sm">
          Category:{" "}
          <span>
            <Link href={"/"}>{product.category}</Link>
          </span>{" "}
          &gt;{" "}
          <span className="text-gray-500 lowercase">
            {product.brand} {product.name}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5">
        {/* Images */}
        <ProductImages images={product.images} />

        {/* Details column */}
        <div className="col-span-2 p-5">
          <div className="flex flex-col gap-6">
            <div className="flex gap-3">
              <Badge>{product.category}</Badge>
              <Badge
                className={`${!product.featured ? "bg-green-700 text-green-100" : "bg-red-700 text-red-100"}`}
              >
                {product.isFeatured ? "Top Deal" : "Featured"}
              </Badge>
            </div>
            <h1 className="h3-bold">
              {product.brand} {product.name}
            </h1>
            <span>Brand: {product.brand}</span>
            <div className="border-gray-300 m-3 p-3 border rounded-md">
              <div className="">
                <div className="flex sm:flex-row flex-col sm:items-center gap-3">
                  {product.stock > 0 && (
                    <>
                      <ProductPrice
                        value={Number(product.price)}
                        product={product}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <p>
              {product.rating} of {product.numReviews} Reviews
            </p>
            {product.stock > 0 && (
              <AddToCart
                item={{
                  product_id: product.id,
                  name: product.name,
                  slug: product.slug,
                  qty: 1,
                  image: product.images![0],
                  price: product.price,
                }}
              />
            )}
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
              {/* <div className="flex justify-between mb-2">
                <ProductPrice
                  value={Number(product.price)}
                  className="text-xl"
                  product={product}
                />
              </div> */}
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
                <AddToCart
                  item={{
                    product_id: product.id,
                    name: product.name,
                    slug: product.slug,
                    qty: 1,
                    image: product.images![0],
                    price: product.price,
                  }}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
