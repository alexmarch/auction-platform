import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QauctionListComponent } from './qauction-list.component';

describe('QauctionListComponent', () => {
  let component: QauctionListComponent;
  let fixture: ComponentFixture<QauctionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QauctionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QauctionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
