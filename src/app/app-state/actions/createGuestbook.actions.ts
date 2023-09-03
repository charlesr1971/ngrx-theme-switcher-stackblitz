import { createAction, props } from '@ngrx/store';

export const createGuestbook = createAction(
    '[CreateGuestbook] CreateGuestbook API Request',
    props<{credentials: {title: string, content: string}}>()
);

export const createGuestbookSuccess = createAction(
    '[CreateGuestbook] CreateGuestbook API Request Success',
    props<any>()
);

export const createGuestbookRemoveProfanities = createAction(
    '[CreateGuestbook] CreateGuestbook API Request Remove Profanities'
);

export const createGuestbookFailure = createAction(
    '[CreateGuestbook] CreateGuestbook API Request Failure',
    props<{message: string}>()
);
