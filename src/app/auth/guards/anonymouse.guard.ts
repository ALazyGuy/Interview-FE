import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, skipUntil, skipWhile, take, takeLast, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { statusSelector } from 'src/app/store/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class AnonymouseGuard{

  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token') !== null;
    return this.store.select(statusSelector).pipe(
      skipWhile(status => ((status === 'loading') && token)),
      map(status => status === 'not-loaded'),
      tap(isNotLoaded => !isNotLoaded && this.router.navigateByUrl('sensors')));
  }
  
}
