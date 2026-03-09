import { getSessionStatus, logoutRequest } from "@/lib/api";

export async function isAuthenticated(): Promise<boolean> {
  try {
    const response = await getSessionStatus();
    return response.data.authenticated;
  } catch {
    return false;
  }
}

export async function logoutSession(): Promise<void> {
  await logoutRequest();
}
