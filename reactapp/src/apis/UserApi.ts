import { User } from "../models/User";
export interface UserAPIResponse {
  displayMessage: string;
  isSuccess: boolean;
  isRefetching: boolean;
}

const baseApiUrl = `/api/users/`;

export const UserAPI = {
  create: async function (user: User): Promise<UserAPIResponse> {
    const response = await fetch(`${baseApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  },
  createMultiple: async function (users: User[]): Promise<UserAPIResponse> {
    const response = await fetch(`${baseApiUrl}/ListImport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    return await handleResponse(response);
  },
  getAll: async function (): Promise<User[]> {
    const response = await fetch(`${baseApiUrl}`);
    return await response.json();
  },
  update: async function (user: User): Promise<UserAPIResponse> {
    const response = await fetch(`${baseApiUrl}${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await handleResponse(response);
  },
  delete: async function (userId: number): Promise<UserAPIResponse> {
    const response = await fetch(`${baseApiUrl}${userId}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  },
  deleteMultiple: async function (userIds: number[]): Promise<UserAPIResponse> {
    const response = await fetch(`${baseApiUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userIds),
    });
    return await handleResponse(response);
  },
};

const handleResponse = async (response: Response): Promise<UserAPIResponse> => {
  const displayMessage = await response.text();
  if (!response.ok) {
    return {
      displayMessage: displayMessage,
      isSuccess: false,
      isRefetching: false,
    };
  } else {
    return {
      displayMessage: displayMessage,
      isSuccess: true,
      isRefetching: true,
    };
  }
};
