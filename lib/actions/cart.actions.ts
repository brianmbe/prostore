"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { auth } from "@/auth/auth";
import { convertPrismaObjToObj, formatError, round2 } from "../utils";
import { cartItemSchema, insertCartSchema } from "../validators";
import { shippingFee, vatFee } from "../constants";
import { Prisma } from "@prisma/client";

// Calculate cart prices
const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + +item.price * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice * shippingFee),
    taxPrice = round2(itemsPrice * vatFee),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};

export async function addItemToCart(data: CartItem) {
  try {
    // check for the cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    // get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get cart
    const cart = await getMyCart();

    // parse and validate items
    const item = cartItemSchema.parse(data);

    // Finding product in database
    const product = await prisma.product.findFirst({
      where: {
        id: item.product_id,
      },
    });

    if (!product) throw new Error("Product not found");

    if (!cart) {
      //Create new cart item
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calcPrice([item]),
      });

      // Testing db & pdt
      console.log(newCart);

      // add to database
      await prisma.cart.create({
        data: newCart,
      });

      // revalidate path
      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${data.name} successfully added to cart`,
      };
    } else {
      // check if item is already in the cart
      const itemAleadyExist = (cart.items as CartItem[]).find(
        (itemx) => itemx.product_id === item.product_id
      );

      if (itemAleadyExist) {
        // check stock
        if (product.stock < itemAleadyExist.qty + 1) {
          throw new Error(`Only ${product.stock} left in stock`);
        }

        // Enough qnty then add stock
        (cart.items as CartItem[]).find(
          (itemx) => itemx.product_id === item.product_id
        )!.qty = itemAleadyExist.qty + 1;
      } else {
        // check stock
        if (product.stock < 1)
          throw new Error(`Not enough stock, ${product.stock} left`);

        // add item to cart.items
        cart.items.push(item);
      }

      // save to database
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: cart.items as Prisma.CartUpdateitemsInput[],
          ...calcPrice(cart.items as CartItem[]),
        },
      });

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.brand} ${product.name} ${itemAleadyExist ? "Updated in" : "added to"} cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function getMyCart() {
  // check for the cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("Cart session not found");

  // get session and user id
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  //convert decimals and return
  return convertPrismaObjToObj({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // check for the cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    // Get product
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
    if (!product) throw new Error("Product not found");

    // Get user cart
    const cart = await getMyCart();

    if (!cart) throw new Error("Cart not found");

    // check for item in cart
    const exist = (cart.items as CartItem[]).find(
      (x) => x.product_id === productId
    );

    if (!exist) throw new Error("Item not found");

    // check only if 1 qnty in cart
    if (exist.qty === 1) {
      // remove from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.product_id !== exist.product_id
      );
    } else {
      // decrease qnty
      (cart.items as CartItem[]).find((x) => x.product_id === productId)!.qty =
        exist.qty - 1;
    }

    // Update qnty in cart in database
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.brand} ${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
