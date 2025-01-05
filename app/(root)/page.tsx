import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/share/product/product-list";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

export default async function HomePage() {
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList
        data={latestProducts}
        title="Newest Products"
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
}
