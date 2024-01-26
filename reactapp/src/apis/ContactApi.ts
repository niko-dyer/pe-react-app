import { Contact } from "../models/Contact";

export interface ContactAPIResponse {
  displayMessage: string;
  isSuccess: boolean;
  isRefetching: boolean;
}

const baseApiUrl = "/api/contacts/";

export const ContactAPI = {
  create: async function (contact: Contact): Promise<ContactAPIResponse> {
    const response = await fetch(`${baseApiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    return await handleResponse(response);
  },
  createMultiple: async function (
    contacts: Contact[]
  ): Promise<ContactAPIResponse> {
    const response = await fetch(`${baseApiUrl}/ListImport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contacts),
    });
    return await handleResponse(response);
  },
  getAll: async function (): Promise<Contact[]> {
    const response = await fetch(`${baseApiUrl}`);
    return await response.json();
  },
  update: async function (contact: Contact): Promise<ContactAPIResponse> {
    const response = await fetch(`${baseApiUrl}${contact.contactId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });
    return await handleResponse(response);
  },
  delete: async function (contactId: number): Promise<ContactAPIResponse> {
    const response = await fetch(`${baseApiUrl}${contactId}`, {
      method: "DELETE",
    });
    return await handleResponse(response);
  },
  deleteMultiple: async function (
    contactIds: number[]
  ): Promise<ContactAPIResponse> {
    const response = await fetch(`${baseApiUrl}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactIds),
    });
    return await handleResponse(response);
  },
};

const handleResponse = async (
  response: Response
): Promise<ContactAPIResponse> => {
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
