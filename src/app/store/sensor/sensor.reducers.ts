import { createReducer, on } from "@ngrx/store";
import { loadPopupDataError, loadPopupDataSuccess, loadSensors, loadSensorsFailure, loadSensorsSuccess } from "./sensor.actions";
import { initialSensorState } from "./sensor.state";

export const SensorReducer = createReducer(
    initialSensorState,
    on(loadSensors, state => ({...state, loading: true})),
    on(loadSensorsSuccess, (state, {loadedSensors, total}) => ({
        ...state, 
        loading: false, 
        error: null,
        total: total,
        status: 'success',
        sensors: loadedSensors})),
    on(loadSensorsFailure, (state, {error}) => ({
        ...state, 
        loading: false, 
        sensors: [],
        total: 0,
        error: error})),
    on(loadPopupDataSuccess, (state, {units, types}) => ({
        ...state,
        units: units,
        types: types
    })),
    on(loadPopupDataError, state => ({
        ...state,
        types: [],
        units: []
    }))
);