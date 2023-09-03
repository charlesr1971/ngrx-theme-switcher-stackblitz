import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyThemeSwitcherComponent } from '../my-theme-switcher/my-theme-switcher.component';

describe('MyThemeSwitcherComponent', () => {
  let component: MyThemeSwitcherComponent;
  let fixture: ComponentFixture<MyThemeSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyThemeSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
