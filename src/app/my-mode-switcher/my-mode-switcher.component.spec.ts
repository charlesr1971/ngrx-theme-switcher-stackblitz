import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyModeSwitcherComponent } from './my-mode-switcher.component';

describe('MyModeSwitcherComponent', () => {
  let component: MyModeSwitcherComponent;
  let fixture: ComponentFixture<MyModeSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyModeSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyModeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
