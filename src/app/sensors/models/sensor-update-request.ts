export interface SensorUpdateRequest {
    name: string;
    model: string;
    from: number;
    to: number;
    type: string;
    unit: string;
    location: string;
    description: string;
}
