import { createAction, props } from '@ngrx/store';

export const changeTheme = createAction(
    '[ThemeSwitcher Component] ChangeTheme',
    props<{ id: number }>()
);
