import { Action, createReducer, on } from '@ngrx/store';
import * as CreateGuestbookActions from '../actions/createGuestbook.actions';
import { Guestbook } from '../../my-guestbook/guestbook.model';

export interface CreateGuestbookState {
  guestbooks?: Array<Guestbook>;
  display?: boolean;
}

export const initialState: CreateGuestbookState = {
  guestbooks: [],
  display: true
};

export const createGuestbookReducer = createReducer(
  initialState,
  on(CreateGuestbookActions.createGuestbook, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbook: state: ',state,' action: ',action);
    return {
      ...state,
      action: action.credentials,
      guestbooks: [...state.guestbooks],
      display: true
    }
  }),
  on(CreateGuestbookActions.createGuestbookSuccess, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbookSuccess: state: ',state,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: [...state.guestbooks, action.guestbook],
      display: true
    }
  }),
  on(CreateGuestbookActions.createGuestbookRemoveProfanities, ( state, action ) => {
    let guestbooks = undefined !== state.guestbooks ? [...state.guestbooks] : [];
    if (Array.isArray(guestbooks) && guestbooks.length) {
      guestbooks = guestbooks.filter(guestbook => guestbook.hasprofanity === 0);
    }
    console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbookRemoveProfanities: guestbooks: ',guestbooks,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: guestbooks,
      display: false
    }
  }),
  on(CreateGuestbookActions.createGuestbookFailure, ( state, action ) => {
    //console.log('CreateGuestbook.createGuestbookReducer: CreateGuestbookActions.createGuestbookFailure: state: ',state,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: [...state.guestbooks],
      display: true
    }
  })
);

export function reducer(state: CreateGuestbookState | undefined, action: Action) {
  return createGuestbookReducer(state, action);
}

export const createGuestbooks = (state: CreateGuestbookState | undefined) => {
  //console.log('CreateGuestbook.createGuestbookReducer: createGuestbooks: state: ',state);
  return {
    guestbooks: state ? state.guestbooks : null,
    display: state ? state.display : true
  };
};
