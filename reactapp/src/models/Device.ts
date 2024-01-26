export interface Device {
    id: number;
    category: string;
    type: string;
    size: string;
    count: number;
    grade: string;
    location: string;
    campaign?: string;
}