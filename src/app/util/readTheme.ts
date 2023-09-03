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

export function readTheme( materialThemes: Array<MaterialTheme>, id: number ): any {
    let result: any = {};
    materialThemes.map( ( currentValue, index ) => {
      if (currentValue['id'] === id) {
        result = currentValue;
      }
    });
    return result;
}
