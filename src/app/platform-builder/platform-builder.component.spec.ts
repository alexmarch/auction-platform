import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformBuilderComponent } from './platform-builder.component';

describe('PlatformBuilderComponent', () => {
  let component: PlatformBuilderComponent;
  let fixture: ComponentFixture<PlatformBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
