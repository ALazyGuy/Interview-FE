import { Sensor } from "src/app/store/sensor/sensor.model";

export interface SensorsResponse {
    sensors: Sensor[];
    total: number;
}
