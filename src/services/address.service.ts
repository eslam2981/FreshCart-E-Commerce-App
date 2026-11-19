import { AddressesResponse, Address } from "@/interfaces/address";

const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export interface CreateAddressPayload {
  name: string;
  details: string;
  phone: string;
  city: string;
}

// Get logged user addresses
export async function getLoggedUserAddresses(token: string): Promise<AddressesResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/addresses`, {
    headers: {
      token,
    },
    cache: "no-store",
  });
  return res.json();
}

// Add new address
export async function addAddress(
  payload: CreateAddressPayload,
  token: string
): Promise<AddressesResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Remove address
export async function removeAddress(
  addressId: string,
  token: string
): Promise<AddressesResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });
  return res.json();
}

// Get specific address
export async function getSpecificAddress(
  addressId: string,
  token: string
): Promise<{ status: string; data: Address }> {
  const res = await fetch(`${BASE_URL}/api/v1/addresses/${addressId}`, {
    headers: {
      token,
    },
  });
  return res.json();
}
