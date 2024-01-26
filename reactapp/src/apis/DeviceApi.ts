import { Device } from "../models/Device";

export interface DeviceAPIResponse {
    displayMessage: string;
    isSuccess: boolean;
    isRefetching: boolean;
}

const baseApiUrl = "/api/contacts/";

export const ContactAPI = {
    create: async function (device: Device): Promise<DeviceAPIResponse> {
        const response = await fetch(`${baseApiUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(device),
        });
        return await handleResponse(response);
    },
    getAll: async function (): Promise<Device[]> {
        const response = await fetch(`${baseApiUrl}`);
        return await response.json();
    },
    update: async function (device: Device): Promise<DeviceAPIResponse> {
        const response = await fetch(`${baseApiUrl}${device.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(device),
        });
        return await handleResponse(response);
    },
    delete: async function (deviceId: number): Promise<DeviceAPIResponse> {
        const response = await fetch(`${baseApiUrl}${deviceId}`, {
            method: "DELETE",
        });
        return await handleResponse(response);
    },
    deleteMultiple: async function (
        deviceIds: number[]
    ): Promise<DeviceAPIResponse> {
        const response = await fetch(`${baseApiUrl}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(deviceIds),
        });
        return await handleResponse(response);
    },
};

const handleResponse = async (
    response: Response
): Promise<DeviceAPIResponse> => {
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
