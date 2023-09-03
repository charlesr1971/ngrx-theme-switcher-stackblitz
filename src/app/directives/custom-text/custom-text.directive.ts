import { Directive, AfterViewInit, OnInit, OnChanges, Input, ElementRef, Renderer2, Inject, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare var TweenMax: any, Elastic: any, Linear: any;

@Directive({
  selector: '[appCustomText]'
})
export class CustomTextDirective implements OnInit, AfterViewInit, OnChanges {

  @Input() appCustomTextRotationMax: number = 0;
  @Input() appCustomTextStrLength: number = 4;
  @Input() appCustomText: string = '';

  debug: boolean = false;

  customTextMaxStrLength: number = 8;
  customTextMinStrLength: number = 3;

  constructor(@Inject(DOCUMENT) private documentBody: Document,
    private el: ElementRef,
    private renderer: Renderer2) { 

  }

  ngOnInit() {


  }

  ngAfterViewInit() {

    this.appCustomTextStrLength = this.appCustomTextStrLength > this.customTextMaxStrLength ? this.customTextMaxStrLength : this.appCustomTextStrLength;
    this.appCustomTextStrLength = this.appCustomTextStrLength < this.customTextMinStrLength ? this.customTextMinStrLength : this.appCustomTextStrLength;

    this.buildCustomText();
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (changes.appCustomText) {
      if(this.debug) {
        console.log('CustomTextDirective.component: ngOnChanges: changes.appCustomText.currentValue: ',changes.appCustomText.currentValue);
      }
      this.buildCustomText();
    }   
  }

  private buildCustomText(): void {

    const appcustomtext1 = this.documentBody.getElementById('app-custom-text-1');
    const appcustomtext2 = this.documentBody.getElementById('app-custom-text-2');

    if(appcustomtext1) {
      appcustomtext1.remove();
    }

    if(appcustomtext2) {
      appcustomtext2.remove();
    }

    const text = this.appCustomText;

    const div1 = this.renderer.createElement('div');
    const span1 = this.renderer.createElement('span');
    this.renderer.setAttribute(span1,'id','app-custom-text-text-1');
    const text1 = this.renderer.createText(window.btoa(text));
    this.renderer.setAttribute(div1,'class','app-custom-text-1');
    this.renderer.setAttribute(div1,'id','app-custom-text-1');
    this.renderer.appendChild(span1,text1);
    this.renderer.appendChild(div1,span1);
    const div2 = this.renderer.createElement('div');
    this.renderer.setAttribute(div2,'class','app-custom-text-2');
    this.renderer.setAttribute(div2,'id','app-custom-text-2');

    const textArray = text.split("");

    if(this.debug) {
      console.log('CustomTextDirective.component: buildCustomText: textArray: ',textArray);
    }


    if(textArray.length > 0) {
      for(var i = 0; i < textArray.length; i++) {
        const span2 = this.renderer.createElement('span');
        if(this.appCustomTextRotationMax > 0) {
          this.renderer.setStyle(span2,'transform','rotate(' + this.getRandomInt(0,this.appCustomTextRotationMax)  + 'deg)');
        }
        const text2 = this.renderer.createText(textArray[i]);
        if(textArray[i] == " " || textArray[i] == ""){
          this.renderer.setAttribute(span2,'class','space');
        }
        this.renderer.appendChild(span2,text2);
        this.renderer.appendChild(div2,span2);
      }
    }
    this.renderer.appendChild(this.el.nativeElement,div1);
    this.renderer.appendChild(this.el.nativeElement,div2);

    TweenMax.staggerFromTo('.app-custom-text-2 span', 1, {scale: 0, opacity:0, ease:Elastic.easeOut, delay: 0}, {scale: 1, opacity:1, ease:Elastic.easeOut, delay: 0}, 0.125);

  }

  private getRandomInt(min: number = 1000000, max: number = 9999999): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private getRandomStr(length: number = this.appCustomTextStrLength): string {
    const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',1,2,3,4,5,6,7,8,9,0];
    let str = '';
    for(var i = 0; i < length; i++) {
      str += chars[this.getRandomInt(0,(chars.length-1))];
    }
    return str;
  }

  public resetCustomText(): void {

    this.buildCustomText();

  }

}
