"use server";

import { z } from "zod";
import {
  shippingAddressSchema,
  signInFormSchema,
  signInUpFormSchema,
  paymentMethodSchema,
} from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatError } from "../utils";
import { ShippingAddressType } from "@/types";

// Sign in user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

// Sign out user
export async function signOutUser() {
  await signOut();
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signInUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // Plain password
    const plainPassword = user.password;

    user.password = hashSync(plainPassword, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User has been successfully registered",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get a suer by ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}

// Update user address
export async function updateUserAddress(data: ShippingAddressType) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    // get the new address
    const address = shippingAddressSchema.parse(data);

    // update database
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { address },
    });

    return {
      success: true,
      message: "User adress updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// Update users payments mtds
export async function updateUserpaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user?.id,
      },
    });

    if (!currentUser) throw new Error("User not found");

    // if there is an authenticated user
    const paymentMethod = paymentMethodSchema.parse(data);

    // upadte database
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
