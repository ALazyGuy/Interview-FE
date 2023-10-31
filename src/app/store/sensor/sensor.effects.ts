import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { loadSensors, loadSensorsFailure, loadSensorsSuccess } from "./sensor.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { ApiService } from "src/app/core/services/api.service";

@Injectable()
export class SensorEffects {

    constructor(private actions$: Actions, private apiService: ApiService) {}

    loadSensors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSensors),
            switchMap(() => this.apiService.loadSensors().pipe(
                map(response => loadSensorsSuccess({loadedSensors: response.sensors})),
                catchError(error => of(loadSensorsFailure({error: error})))
            ))
        )
    );

}