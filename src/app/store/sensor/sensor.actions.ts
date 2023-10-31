import { createAction, props } from "@ngrx/store";
import { Sensor } from "./sensor.model";

export const loadSensors = createAction('[Sensors] Load');
export const loadSensorsSuccess = createAction(
    '[Sensors] Load success',
    props<{loadedSensors: Sensor[]}>());
export const loadSensorsFailure = createAction(
    '[Sensors] Load failure',
    props<{error: string}>());