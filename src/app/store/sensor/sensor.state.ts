import { Sensor } from "./sensor.model";

export interface SensorState {
    sensors: Sensor[];
    total: number;
    loading: boolean;
    units: string[];
    types: string[];
};

export const initialSensorState: SensorState = {
    sensors: [],
    total: 0,
    loading: false,
    units: [],
    types: []
};