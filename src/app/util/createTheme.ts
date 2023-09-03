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

export function createTheme( theme: Theme ): MaterialTheme {
    const debug: boolean = false;
    const themeObj: Theme = theme;
    const atheme: string = themeObj['themeName'].toString() === '0' ? '' : themeObj['themeName'];
    const result: MaterialTheme = {
        default: 'theme-1-dark',
        id: 1,
        stem: 'theme-1',
        light: 'theme-1-light',
        dark: 'theme-1-dark',
        colorName: '',
        primaryIndex: '',
        primaryHex: '',
        colorNameTitle: ''
    };
    if (debug) {
        console.log('http.service: createTheme(): atheme ', atheme);
    }
    if (atheme !== '') {
        result['default'] = atheme + '-dark';
        const themeArray: Array<string> = (atheme as string).split('-');
        if (Array.isArray(themeArray) && themeArray.length === 2) {
            const id: number = parseInt( themeArray[1], 10 );
            result['id'] = id;
            result['stem'] = 'theme-' + id;
            result['light'] = 'theme-' + id + '-light';
            result['dark'] = 'theme-' + id + '-dark';
            result['colorName'] = themeObj['colorName'];
            result['primaryIndex'] = themeObj['primaryIndex'];
            result['primaryHex'] = themeObj['primaryHex'];
            const colorNameTitle: string = themeObj['colorName'].replace('$', '').replace(/[-]+/gim, ' ');
            result['colorNameTitle'] = colorNameTitle;
        }
    }
    if (debug) {
        console.log('util: createTheme(): result ', result);
    }
    return result;
}
