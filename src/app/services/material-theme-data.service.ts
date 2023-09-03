import { Injectable } from '@angular/core';
import { createTheme } from '../util/createTheme';
import { materialThemeData } from '../util/data';

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

interface Theme {
  themeName: string;
  colorName: string;
  primaryIndex: string;
  primaryHex: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialThemeDataService {

  materialThemes: Array<MaterialTheme> = [];

  constructor() {
    this.materialThemes = materialThemeData.map( ( currentValue, index ) => {
      const theme: Theme = currentValue;
      return createTheme(theme);
    });
  }

}
