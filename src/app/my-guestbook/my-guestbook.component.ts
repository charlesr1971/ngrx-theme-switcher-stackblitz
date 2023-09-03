import { Component, OnInit, OnDestroy, Input, Inject, ElementRef, Renderer2, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Store, select } from '@ngrx/store';
import * as CreateGuestbookActions from '../app-state/actions/createGuestbook.actions';
import * as ReadGuestbookActions from '../app-state/actions/readGuestbook.actions';
import * as fromRoot from '../app-state';

import { CustomTextDirective } from '../directives/custom-text/custom-text.directive';

import { Guestbook } from './guestbook.model';
import { HttpService } from '../services/http.service';
import { UtilsService } from '../services/utils.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-my-guestbook',
  templateUrl: './my-guestbook.component.html',
  styleUrls: ['./my-guestbook.component.css']
})
export class MyGuestbookComponent implements OnInit, OnDestroy {

  @ViewChild(CustomTextDirective, {static: false}) customTextDirective;

  debug: boolean = false;

  formData = {};
  guestbookForm: FormGroup;
  guestbookTitleInput: FormControl;
  guestbookContentInput: FormControl;
  minInputLength: number = 3;
  maxTitleInputLength: number = environment.maxTitleInputLength;
  maxContentInputLength: number = environment.maxContentInputLength;
  currentPage: number = 1;
  guestbookDate: string = '';
  guestbookContent: string = '';
  guestbookName: string = '';
  guestbookContentRotationMax: number = 0;

  createGuestbookSubscription: Subscription;
  readGuestbookSubscription: Subscription; 
  deleteGuestbookSubscription: Subscription;
  createGuestbook$: Observable<any>;
  readGuestbook$: Observable<any>;

  constructor(private httpService: HttpService,
    private utilsService: UtilsService,
    public matSnackBar: MatSnackBar,
    @Inject(DOCUMENT) private documentBody: Document,
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store,
    private store1: Store<{ createGuestbook: any }>,
    private store2: Store<{ readGuestbook: any }>) { 

      this.createGuestbook$ = store1.select('createGuestbook');
      this.readGuestbook$ = store2.select('readGuestbook');
      this.readGuestbook();

  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.monitorFormValueChanges();
    this.store.pipe(select(fromRoot.createGuestbooks)).subscribe( (data) => {
      if(this.debug) {
        console.log('MyGuestbookComponent.component: ngOnInit: FROMROOT.createGuestbooks: data: ',data);
      }
      const proceed1 = !this.utilsService.isEmpty(data) && 'guestbooks' in data && Array.isArray(data['guestbooks']) && data['guestbooks'].length && 'display' in data && data['display'] === true  ? true : false;
      if(this.debug) {
        console.log('MyGuestbookComponent.component: ngOnInit: FROMROOT.createGuestbooks: proceed1: ',proceed1);
      }
      if(proceed1) {
        const guestbooks = this.sortGuestbooksByDate(data['guestbooks'],'desc');
        if(this.debug) {
          console.log('MyGuestbookComponent.component: ngOnInit: FROMROOT.createGuestbooks: guestbooks: ',guestbooks);
        }
        if(guestbooks.length > 0){
          const obj = guestbooks[0];
          const proceed2 = !this.utilsService.isEmpty(obj) && 'guestbookid' in obj && !isNaN(obj['guestbookid']) && obj['guestbookid'] > 0 && 'title' in obj && 'content' in obj && 'createdAt' in obj ? true : false;
          if(this.debug) {
            console.log('MyGuestbookComponent.component: ngOnInit: FROMROOT.createGuestbooks: proceed2: ',proceed2);
          }
          if(proceed2) {
            this.guestbookDate = obj['createdAt'];
            this.guestbookContent = obj['content'];
            this.guestbookName = obj['title'];
            this.openSnackBar('Comment added successfully', 'Success');
          }
          else{
            const hasprofanity = !this.utilsService.isEmpty(obj) && 'hasprofanity' in obj && !isNaN(obj['hasprofanity']) && obj['hasprofanity'] === 1 ? true : false;
            if(hasprofanity){
              this.openSnackBar('Please remove any profanities and try again', 'Error');
              this.store1.dispatch(CreateGuestbookActions.createGuestbookRemoveProfanities());
            }
            else{
              this.openSnackBar('Comment could not be added', 'Error');
            }
          }
        }
      }
    });
    this.store.pipe(select(fromRoot.readGuestbooks)).subscribe( (data) => {
      if(this.debug) {
        console.log('MyGuestbookComponent.component: ngOnInit: FROMROOT.readGuestbooks: data: ',data);
      }
      if(data.guestbooks.length > 0){
        const obj = data.guestbooks[0];
        this.guestbookDate = obj['createdAt'];
        this.guestbookContent = obj['content'];
        this.guestbookName = obj['title'];
      }
    });
  }

  private createForm(): void {
    this.guestbookForm = new FormGroup({
      guestbookTitleInput: this.guestbookTitleInput,
      guestbookContentInput: this.guestbookContentInput
    });
  }

  private createFormControls(): void {
    this.guestbookTitleInput = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minInputLength),
      Validators.maxLength(this.maxTitleInputLength)
    ]);
    this.guestbookContentInput = new FormControl('', [
      Validators.required,
      Validators.minLength(this.minInputLength),
      Validators.maxLength(this.maxContentInputLength)
    ]);
  }

  private monitorFormValueChanges(): void {
    if(this.guestbookForm) {
      this.guestbookTitleInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(title => {
        if(this.debug) {
          console.log('title: ',title);
        }
        this.formData['title'] = title;
      });
      this.guestbookContentInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(content => {
        if(this.debug) {
          console.log('content: ',content);
        }
        this.formData['content'] = content;
      });
    }
  }

  public createGuestbook(event: any, id: number = 0): void {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: createGuestbook: this.formData["title"]: ',this.formData['title']);
      console.log('MyGuestbookComponent.component: createGuestbook: this.formData["content"]: ',this.formData['content']);
      console.log('MyGuestbookComponent.component: createGuestbook: id: ',id);
    }
    const data = {
      title: this.formData['title'],
      content: this.formData['content']
    }
    if(this.minInputLength < this.formData['content'].length) {
      this.store1.dispatch(CreateGuestbookActions.createGuestbook({credentials: {title: this.formData['title'], content: this.formData['content']}}));
    }
  }

  private readGuestbook(): void {
    if(this.debug) {
      console.log('MyGuestbookComponent.component: readGuestbook');
    }
    this.store2.dispatch(ReadGuestbookActions.readGuestbook({page: this.currentPage, guestbookid: 0}));
  }

  sortGuestbooksByDate(array: Array<Guestbook>, sortOrder: string): Array<Guestbook> {
    let _array = [...array];
    const temp = _array.sort(function(a, b) {
      const dateA: any = new Date(a.createdAt), dateB: any = new Date(b.createdAt);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    return temp;
  }

  private openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.panelClass = action.toLowerCase() === 'error' ? ['custom-class-error'] : ['custom-class'];
    config.duration = 5000;
    this.matSnackBar.open(message, action, config);
  }

  resetCustomText(): void {
    this.customTextDirective.resetCustomText();
  }

  ngOnDestroy() {

    if (this.createGuestbookSubscription) {
      this.createGuestbookSubscription.unsubscribe();
    }

    if (this.readGuestbookSubscription) {
      this.readGuestbookSubscription.unsubscribe();
    }

    if (this.deleteGuestbookSubscription) {
      this.deleteGuestbookSubscription.unsubscribe();
    }

  }

}
