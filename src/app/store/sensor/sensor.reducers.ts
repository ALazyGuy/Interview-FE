import { createReducer, on } from "@ngrx/store";
import { loadSensors, loadSensorsFailure, loadSensorsSuccess } from "./sensor.actions";
import { initialSensorState } from "./sensor.state";

export const SensorReducer = createReducer(
    initialSensorState,
    on(loadSensors, state => ({...state, loading: true})),
    on(loadSensorsSuccess, (state, {loadedSensors, total}) => ({
        ...state, 
        loading: false, 
        error: null,
        total: total,
        sensors: loadedSensors})),
    on(loadSensorsFailure, (state, {error}) => ({
        ...state, 
        loading: false, 
        error: error}))
);