const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export interface UpdateUserDataPayload {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdatePasswordPayload {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface UserResponse {
  message?: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
    role?: string;
  };
  token?: string;
  statusMsg?: string;
  errors?:
    | {
        msg?: string;
        param?: string;
        value?: string;
      }[]
    | {
        msg?: string;
        param?: string;
        value?: string;
      };
}

// Update logged in user profile data
export async function updateLoggedUserData(
  payload: UpdateUserDataPayload,
  token: string
): Promise<UserResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/users/updateMe`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

// Update logged in user password
export async function updateLoggedUserPassword(
  payload: UpdatePasswordPayload,
  token: string
): Promise<UserResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/users/changeMyPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}
