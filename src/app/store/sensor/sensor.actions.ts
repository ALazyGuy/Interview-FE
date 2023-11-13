import { createAction, props } from "@ngrx/store";
import { Sensor } from "./sensor.model";
import { SensorUpdateRequest } from "src/app/sensors/models/sensor-update-request";

export const loadSensors = createAction(
    '[Sensors] Load',
    props<{page: number, searchString: string}>());
export const loadSensorsSuccess = createAction(
    '[Sensors] Load success',
    props<{loadedSensors: Sensor[], total: number}>());
export const loadSensorsFailure = createAction(
    '[Sensors] Load failure',
    props<{error: string}>());
export const deleteSensor = createAction(
    '[Sensors] Delete',
    props<{id: number, searchString: string}>()
);
export const loadPopupData = createAction('[Sensors] Load popup data');
export const loadPopupDataSuccess = createAction(
    '[Sensors] Load popup data success',
    props<{units: string[], types: string[]}>()
);
export const loadPopupDataError = createAction('[Sensors] Load popup data error');