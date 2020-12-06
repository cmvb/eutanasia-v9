import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOComponent } from './header-o.component';

describe('HeaderOComponent', () => {
  let component: HeaderOComponent;
  let fixture: ComponentFixture<HeaderOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
