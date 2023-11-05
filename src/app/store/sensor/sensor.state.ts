import { Sensor } from "./sensor.model";

export interface SensorState {
    sensors: Sensor[];
    total: number;
    loading: boolean;
    error: string | null;
};

export const initialSensorState: SensorState = {
    sensors: [],
    total: 0,
    loading: false,
    error: null
};