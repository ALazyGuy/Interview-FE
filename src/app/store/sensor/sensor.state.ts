import { Sensor } from "./sensor.model";

export interface SensorState {
    sensors: Sensor[];
    loading: boolean;
    error: string | null;
};

export const initialSensorState: SensorState = {
    sensors: [],
    loading: false,
    error: null
};