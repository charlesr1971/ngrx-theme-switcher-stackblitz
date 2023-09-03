import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeTheme } from '../app-state/actions/themeSwitcher.actions';
import { readTheme } from '../util/readTheme';
import { MaterialThemeDataService } from '../services/material-theme-data.service';

interface MaterialTheme {
  default: string;
  id: number;
  stem: string;
  light: string;
  dark: string;
  colorName: string;
  primaryIndex: string;
  primaryHex: string;
  colorNameTitle: string;
}

@Component({
  selector: 'app-my-theme-switcher',
  templateUrl: './my-theme-switcher.component.html',
  styleUrls: ['./my-theme-switcher.component.css'],
})
export class MyThemeSwitcherComponent implements OnInit {

  private debug: boolean = false;

  private themeSwitch$: Observable<number>;
  private themeSwitch: string = '';
  private colorNameTitle: string = '';
  private materialThemes: Array<MaterialTheme> = [];
  private selectionPrimaryHex: string = '';
  private selectionText: string = '';

  constructor(
    private store: Store<{ themeSwitch: number }>,
    private MaterialThemeDataService: MaterialThemeDataService
  ) {
    this.themeSwitch$ = store.select('themeSwitch');
    this.materialThemes = this.MaterialThemeDataService.materialThemes;
    if (this.debug) {
      console.log('my-theme-switcher.component: this.materialThemes: ', this.materialThemes);
    }
  }

  changeTheme( event: any ): void {
    const id: number = event.value;
    if (this.debug) {
      console.log('my-theme-switcher.component: id: ', id);
    }
    this.store.dispatch(changeTheme({ id }));
    const materialTheme: MaterialTheme = readTheme( this.MaterialThemeDataService.materialThemes, id );
    if ('primaryHex' in materialTheme) {
      this.selectionPrimaryHex = materialTheme['primaryHex'];
    }
    if ('colorNameTitle' in materialTheme) {
      this.selectionText = materialTheme['colorNameTitle'];
    }
  }

  ngOnInit(): void {
    this.store.select('themeSwitch').subscribe( ( id ) => {
      const materialTheme: MaterialTheme = readTheme( this.MaterialThemeDataService.materialThemes, id );
      this.colorNameTitle = materialTheme['colorNameTitle'];
    });
  }

}
