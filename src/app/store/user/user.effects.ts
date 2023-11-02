import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadUser, loadUserSuccess, removeUser } from "./user.actions";
import { catchError, empty, map, of, switchMap, tap } from "rxjs";
import { UserService } from "src/app/auth/services/user.service";

@Injectable()
export class UserEffects {

    constructor(private userService: UserService, private actions$: Actions){}

    loadUser$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(() => this.userService.loadRole().pipe(
                map(response => loadUserSuccess({role: response.role})),
                catchError(() => of(removeUser()))
            ))
        )
    );
}