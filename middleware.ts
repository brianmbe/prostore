export async function middleware(req: any) {
  const { auth } = await import("@/auth/auth");
  return auth(req);
}
