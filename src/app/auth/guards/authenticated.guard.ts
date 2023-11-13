import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, skipWhile, tap } from 'rxjs';
import { statusSelector } from 'src/app/store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard {
  constructor(private store: Store, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token') !== null;
    return this.store.select(statusSelector).pipe(
      skipWhile(status => ((status === 'loading') && token)),
      map(status => status === 'loaded'),
      tap(loaded => {
        if(!loaded) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('auth');
        }
      }));
  }

}
