import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { SensorsService } from "src/app/sensors/services/sersors.service";
import { deleteSensor, loadPopupData, loadPopupDataError, loadPopupDataSuccess, loadSensors, loadSensorsFailure, loadSensorsSuccess } from "./sensor.actions";

@Injectable()
export class SensorEffects {

    constructor(private actions$: Actions, private sensorsService: SensorsService) {}

    loadSensors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSensors),
            switchMap(action => this.sensorsService.loadSensors(action.page, action.searchString).pipe(
                map(response => loadSensorsSuccess({loadedSensors: response.sensors, total: response.total})),
                catchError(error => of(loadSensorsFailure({error: error})))
            ))
        )
    );

    deleteSensor$ = createEffect(() => 
        this.actions$.pipe(
            ofType(deleteSensor),
            switchMap(action => this.sensorsService.deleteSensor(action.id).pipe(
                map(() => loadSensors({page: 0, searchString: action.searchString}))
            ))
        )
    );

    loadPopupData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPopupData),
            switchMap(() => this.sensorsService.loadPopupData().pipe(
                map(response => loadPopupDataSuccess(response)),
                catchError(() => of(loadPopupDataError()))
            ))
        )
    );
}