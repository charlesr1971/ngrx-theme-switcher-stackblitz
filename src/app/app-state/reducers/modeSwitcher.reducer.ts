import { createReducer, on } from '@ngrx/store';
import { changeMode } from '../actions/modeSwitcher.actions';

export const initialState: number = 1;

const debug: boolean = false;

const modeSwitchereducer = createReducer(
  initialState,
  on(changeMode, ( state, action ) => {
    if (debug) {
      console.log('modeSwitcher.reducer: modeSwitchereducer: state ', state, ' action:', action);
    }
    return action.id;
  })
);

export function modeSwitcherReducer( state, action ): any {
  if (debug) {
    console.log('modeSwitcher.reducer: modeSwitcherReducer: state ', state, ' action:', action);
  }
  return modeSwitchereducer(state, action);
}
