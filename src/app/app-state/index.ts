import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
  } from '@ngrx/store';
  import { environment } from '../../environments/environment';
  import * as fromCreateGuestbook from './reducers/createGuestbook.reducer';
  import * as fromReadGuestbook from './reducers/readGuestbook.reducer';

export const createGuestbookState = createFeatureSelector<fromCreateGuestbook.CreateGuestbookState>('createGuestbook');

export const createGuestbooks = createSelector(
    createGuestbookState,
    fromCreateGuestbook.createGuestbooks
);

export const readGuestbookState = createFeatureSelector<fromReadGuestbook.ReadGuestbookState>('readGuestbook');

export const readGuestbooks = createSelector(
    readGuestbookState,
    fromReadGuestbook.readGuestbooks
);