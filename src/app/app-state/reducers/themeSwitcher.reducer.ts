import { createReducer, on } from '@ngrx/store';
import { changeTheme } from '../actions/themeSwitcher.actions';

export const initialState: number = 1;

const debug: boolean = false;

const themeSwitchereducer = createReducer(
  initialState,
  on(changeTheme, ( state, action ) => {
    if (debug) {
      console.log('themeSwitcher.reducer: themeSwitchereducer: state ', state, ' action:', action);
    }
    return action.id;
  })
);

export function themeSwitcherReducer( state, action ): any {
  if (debug) {
    console.log('themeSwitcher.reducer: themeSwitcherReducer: state ', state, ' action:', action);
  }
  return themeSwitchereducer(state, action);
}
