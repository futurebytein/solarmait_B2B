export const getServerAuthToken = async () => {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = cookies();
    return cookieStore.get("token")?.value;
  }
};
