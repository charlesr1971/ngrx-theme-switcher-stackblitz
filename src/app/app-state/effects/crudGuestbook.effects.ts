import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HttpService } from '../../services/http.service';

import * as CreateGuestbookActions from '../actions/createGuestbook.actions';
import * as ReadGuestbookActions from '../actions/readGuestbook.actions';

@Injectable()
export class CrudGuestbookEffects {

  constructor(private actions$: Actions,
    private router: Router,
    private httpService: HttpService,
  ) {

  }

  /**
   * Create Guestbook
   */

   createGuestbook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateGuestbookActions.createGuestbook),
      exhaustMap(action =>
        this.httpService.createGuestbook(action['credentials']).pipe(
          map(response => CreateGuestbookActions.createGuestbookSuccess(response)),
          catchError((error: any) => of(CreateGuestbookActions.createGuestbookFailure(error))))
      )
    )
  );

  /**
   * Read Guestbook
   */

   readGuestbook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadGuestbookActions.readGuestbook),
      exhaustMap(action =>
        this.httpService.readGuestbook(action['page'],action['guestbookid']).pipe(
          map(response => ReadGuestbookActions.readGuestbookSuccess(response)),
          catchError((error: any) => of(ReadGuestbookActions.readGuestbookFailure(error))))
      )
    )
  );

}