import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SensorState } from "./sensor.state";

export const selectSensors = createFeatureSelector<SensorState>('sensorState');
export const selectAllSensors = createSelector(
    selectSensors,
    (state: SensorState) => state.sensors
);

export const selectTotalSensors = createSelector(
    selectSensors,
    (state: SensorState) => state.total
);