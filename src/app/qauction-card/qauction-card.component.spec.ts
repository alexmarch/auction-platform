import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QauctionCardComponent } from './qauction-card.component';

describe('QauctionCardComponent', () => {
  let component: QauctionCardComponent;
  let fixture: ComponentFixture<QauctionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QauctionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QauctionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
