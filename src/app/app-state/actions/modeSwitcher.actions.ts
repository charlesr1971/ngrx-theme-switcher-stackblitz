import { createAction, props } from '@ngrx/store';

export const changeMode = createAction(
    '[ModeSwitcher Component] ChangeMode',
    props<{ id: number }>()
);
