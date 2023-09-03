import { createAction, props } from '@ngrx/store';

export const readGuestbook = createAction(
    '[ReadGuestbook] ReadGuestbook API Request',
    props<{page: number, guestbookid: number}>()
);

export const readGuestbookSuccess = createAction(
    '[ReadGuestbook] ReadGuestbook API Request Success',
    props<any>()
);

export const readGuestbookFailure = createAction(
    '[ReadGuestbook] ReadGuestbook API Request Failure',
    props<{message: string}>()
);
