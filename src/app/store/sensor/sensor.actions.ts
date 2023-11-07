import { createAction, props } from "@ngrx/store";
import { Sensor } from "./sensor.model";

export const loadSensors = createAction(
    '[Sensors] Load',
    props<{page: number, searchString: string}>());
export const loadSensorsSuccess = createAction(
    '[Sensors] Load success',
    props<{loadedSensors: Sensor[], total: number}>());
export const loadSensorsFailure = createAction(
    '[Sensors] Load failure',
    props<{error: string}>());