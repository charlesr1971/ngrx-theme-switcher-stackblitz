import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGuestbookComponent } from './my-guestbook.component';

describe('MyGuestbookComponent', () => {
  let component: MyGuestbookComponent;
  let fixture: ComponentFixture<MyGuestbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGuestbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGuestbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
