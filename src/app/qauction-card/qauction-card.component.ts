import { ApiService } from '../common/api.service';
import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';
import { IQAuction, IQAuctionLot, QauctionService, States  } from './qauction.service';

@Component({
  selector: 'app-qauction-card',
  templateUrl: './qauction-card.component.html',
  styleUrls: ['./qauction-card.component.css']
})
export class QauctionCardComponent implements OnInit {
  @Input() qauction: IQAuction;
  @Output('auctionRemove') removeHandler: EventEmitter<any> = new EventEmitter<any>();
  @Input() noControls: boolean;

  opened: Boolean = false;
  constructor(private _qauction: QauctionService, private _api: ApiService) { }

  ngOnInit() {
  }

  isStartDisabled() {
    if ( this.qauction.name && this.qauction.description && this.qauction.lots.length > 0) {
      return false;
    }
    return true;
  }

  startAuction() {
    this.qauction.state = States.start;
    if ( !this.qauction.id ) {
      this._api.createQA(this.qauction).subscribe( qauction => {
        console.log('create:', qauction);
        this.qauction.id = qauction.id;
      });
    } else {
      this._api.updateQA(this.qauction).subscribe( qauction => {
        console.log('update', qauction);
      });
    }
  }

  stopAuction() {
    this.qauction.state = States.stop;
    if ( !this.qauction.id ) {
      this._api.createQA(this.qauction).subscribe( qauction => {
        console.log('create:', qauction);
        this.qauction.id = qauction.id;
      });
    } else {
      this._api.updateQA(this.qauction).subscribe( qauction => {
        console.log('update', qauction);
      });
    }
  }

  isFavorite(qauctio: IQAuction) {
    return this._qauction.isFav(qauctio.id);
  }

  addFav(qauctio: IQAuction) {
    this._qauction.addFav(qauctio.id);
  }

  removeFav(qauctio: IQAuction) {
    this._qauction.removeFav(qauctio.id);
  }

  removeQAuction($event: Event) {
    $event.preventDefault();
    if ( this.removeHandler ) {
      this.removeHandler.emit(this.qauction);
    }
  }
}
