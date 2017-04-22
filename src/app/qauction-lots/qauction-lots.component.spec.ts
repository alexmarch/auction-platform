import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QauctionLotsComponent } from './qauction-lots.component';

describe('QauctionLotsComponent', () => {
  let component: QauctionLotsComponent;
  let fixture: ComponentFixture<QauctionLotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QauctionLotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QauctionLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
