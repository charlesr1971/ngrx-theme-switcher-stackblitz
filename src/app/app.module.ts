import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSnackBarModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTreeModule, MatProgressBarModule, MatInputModule, MatSelectModule, MatDialogModule, MatAutocompleteModule, MatCheckboxModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatRadioModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';

import { StoreModule } from '@ngrx/store';
import { themeSwitcherReducer } from './app-state/reducers/themeSwitcher.reducer';
import { MyThemeSwitcherComponent } from './my-theme-switcher/my-theme-switcher.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { modeSwitcherReducer } from './app-state/reducers/modeSwitcher.reducer';
import { MyModeSwitcherComponent } from './my-mode-switcher/my-mode-switcher.component';
import { MyGuestbookComponent } from './my-guestbook/my-guestbook.component';

import { HttpService } from './services/http.service';
import { UtilsService } from './services/utils.service';

import { createGuestbookReducer } from './app-state/reducers/createGuestbook.reducer';
import { readGuestbookReducer } from './app-state/reducers/readGuestbook.reducer';

import { EffectsModule } from '@ngrx/effects';
import { CrudGuestbookEffects } from './app-state/effects/crudGuestbook.effects';

import { CustomTextDirective } from './directives/custom-text/custom-text.directive';



@NgModule({
  declarations: [
    AppComponent,
    MyThemeSwitcherComponent,
    MyModeSwitcherComponent,
    MyGuestbookComponent,
    CustomTextDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTreeModule,
    MatProgressBarModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    OverlayModule,
    /* StoreModule.forRoot({ themeSwitch: themeSwitcherReducer, modeSwitch: modeSwitcherReducer, createGuestbook: createGuestbookReducer, readGuestbook: readGuestbookReducer }), */
    StoreModule.forRoot({ themeSwitch: themeSwitcherReducer, modeSwitch: modeSwitcherReducer }),
    StoreModule.forFeature('createGuestbook',createGuestbookReducer),
    StoreModule.forFeature('readGuestbook',readGuestbookReducer),
    EffectsModule.forRoot([CrudGuestbookEffects])
  ],
  providers: [
    HttpService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
