import { Action, createReducer, on } from '@ngrx/store';
import * as ReadGuestbookActions from '../actions/readGuestbook.actions';
import { Guestbook } from '../../my-guestbook/guestbook.model';

export interface ReadGuestbookState {
  guestbooks: Array<Guestbook>;
}

export const initialState: ReadGuestbookState = {
  guestbooks: []
};

export const readGuestbookReducer = createReducer(
  initialState,
  on(ReadGuestbookActions.readGuestbook, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbook: state: ',state,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: [...state.guestbooks]
    }
  }),
  on(ReadGuestbookActions.readGuestbookSuccess, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbookSuccess: state: ',state,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: [...action.guestbooks]
    }
  }),
  on(ReadGuestbookActions.readGuestbookFailure, ( state, action ) => {
    //console.log('ReadGuestbook.readGuestbookReducer: ReadGuestbookActions.readGuestbookFailure: state: ',state,' action: ',action);
    return {
      ...state,
      action: action,
      guestbooks: [...state.guestbooks]
    }
  })
);

export function reducer(state: ReadGuestbookState | undefined, action: Action) {
  return readGuestbookReducer(state, action);
}

export const readGuestbooks = (state: ReadGuestbookState | undefined) => {
  //console.log('ReadGuestbook.readGuestbookReducer: readGuestbooks: state: ',state);
  return {
    guestbooks: state ? state.guestbooks : null
  };
};
