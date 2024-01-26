import { Device } from "../models/Device";
import { Batch } from "../models/Batch";

export interface DeviceAPIResponse {
  displayMessage: string;
  isSuccess: boolean;
  isRefetching: boolean;
}

const baseApiUrl = "/api/currentdevices/";

export const DeviceAPI = {
  getAll: async function (): Promise<Device[]> {
    const response = await fetch(`${baseApiUrl}`);
    return await response.json();
  },
  update: async function (batch: Batch): Promise<DeviceAPIResponse> {
    const response = await fetch(`${baseApiUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(batch),
    });
    return await handleResponse(response, "Devices Updated Successfully!");
  },
};

const handleResponse = async (
  response: Response,
  successMessage: string
): Promise<DeviceAPIResponse> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    console.log(errorMessage);
    return {
      displayMessage: errorMessage,
      isSuccess: false,
      isRefetching: false,
    };
  } else {
    return {
      displayMessage: successMessage,
      isSuccess: true,
      isRefetching: true,
    };
  }
};
