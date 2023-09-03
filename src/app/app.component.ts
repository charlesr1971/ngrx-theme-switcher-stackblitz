import { ChangeDetectorRef, Component, OnDestroy, HostBinding, OnInit, Renderer2, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MediaMatcher } from '@angular/cdk/layout';
import { createTheme } from './util/createTheme';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { readTheme } from './util/readTheme';

import { MaterialThemeDataService } from './services/material-theme-data.service';

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private debug: boolean = false;

  private title: string = 'ngrx-theme-switcher';
  private cssClassName: string = '';
  private id1: number = 0;
  private id2: number = 0;
  private themeObj: MaterialTheme;
  private theme: Theme = {
    themeName: 'theme-2',
    colorName: '$mat-red',
    primaryIndex: '500',
    primaryHex: '#F44336'
  };
  
  @HostBinding('class') componentCssClass;
  private mobileQuery: MediaQueryList;
  private fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
  private mobileQueryListener: () => void;
  private themeSwitch$: Observable<number>;
  private modeSwitch$: Observable<number>;
  public shouldRun: boolean = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  constructor(
    private overlayContainer: OverlayContainer,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private documentBody: Document,
    private MaterialThemeDataService: MaterialThemeDataService,
    private store1: Store<{ themeSwitch: number }>,
    private store2: Store<{ modeSwitch: number }>,
  ) {
    this.themeSwitch$ = store1.select('themeSwitch');
    this.modeSwitch$ = store2.select('modeSwitch');
    this.themeObj = createTheme(this.theme);
    const themeDefault: string = this.themeObj['default'];
    if (this.debug) {
      console.log('app.component: this.theme: ', themeDefault);
    }
    this.overlayContainer.getContainerElement().classList.add(themeDefault);
    this.componentCssClass = themeDefault;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.store1.select('themeSwitch').subscribe( ( id ) => {
      if (this.debug) {
        console.log('app.component: ngOnInit: id: ', id, ' this.MaterialThemeDataService.materialThemes: ', this.MaterialThemeDataService.materialThemes);
      }
      const materialTheme: MaterialTheme = readTheme( this.MaterialThemeDataService.materialThemes, id );
      if (this.debug) {
        console.log('app.component: ngOnInit: materialTheme 1: ', materialTheme);
      }
      const themeDefault: string = this.id2 == 0 ? materialTheme['default'] : (this.id2 == 1 ? materialTheme['dark'] : materialTheme['light']);
      this.id1 = id;
      this.overlayContainer.getContainerElement().classList.add(themeDefault);
      this.componentCssClass = themeDefault;
      const el: HTMLElement = this.documentBody.querySelector('#ngrx-logo-path');
      if (el) {
        this.renderer.setAttribute(el, 'fill', materialTheme['primaryHex']);
      }
    });
    this.store2.select('modeSwitch').subscribe( ( id ) => {
      this.id2 = id;
      const materialTheme: MaterialTheme = readTheme( this.MaterialThemeDataService.materialThemes, this.id1 );
      if (this.debug) {
        console.log('app.component: ngOnInit: materialTheme 2: ', materialTheme);
      }
      const themeDefault: string = id === 1 ? materialTheme['dark'] : materialTheme['light'];
      this.overlayContainer.getContainerElement().classList.add(themeDefault);
      this.componentCssClass = themeDefault;
      const el: HTMLElement = this.documentBody.querySelector('#ngrx-logo-path');
      if (el) {
        this.renderer.setAttribute(el, 'fill', materialTheme['primaryHex']);
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

}
