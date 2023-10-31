import { SensorState, initialSensorState } from "./sensor/sensor.state";
import { UserState, initialUserState } from "./user/user.state";

export interface AppState {
    sensorState: SensorState;
    userState: UserState;
}

export const initialAppState: AppState = {
    sensorState: initialSensorState,
    userState: initialUserState
};