import { Component, OnInit, Input } from '@angular/core';
import { IQAuctionLot, IQAuction, QauctionService } from '../qauction-card/qauction.service'
import { AwsCognitoService } from '../common/aws-cognito.service';
import { User } from '../common/user.service';
import { ApiService } from '../common/api.service';
@Component({
  selector: 'app-qauction-lots',
  templateUrl: './qauction-lots.component.html',
  styleUrls: ['./qauction-lots.component.css']
})
export class QauctionLotsComponent implements OnInit {
  @Input() lots: Array<IQAuctionLot>;
  @Input() placeBid: boolean;
  @Input() auction: IQAuction;
  user: User;
  success: boolean = false;
  error: boolean = false;
  processing: boolean = false;
  currentBid: Number;
  constructor(
    private _qacution: QauctionService,
    private _api: ApiService,
    private _cognito: AwsCognitoService) { }

  ngOnInit() {
    this._cognito.getCurrentUser((err, attrs) => {
      if ( !err ) {
        this.user = {
            email: attrs.email,
            gender: attrs.gender,
            username: attrs.nickname,
            id: attrs.id
        }
      }
    });
  }

  clearAllLots() {
    this.lots.splice(0, this.lots.length);
  }

  removeLot(index) {
    this.lots.splice(index, 1);
  }

  placeBidValue(lot) {
    // this._qacution.placeBid(lot, this.auction, this.lots.indexOf(lot), this.user.id);
    if ( this.currentBid ) {
      this.processing = true;
      this._api.placeBid(this.auction.id, this.user.id, this.currentBid, this.lots.indexOf(lot))
        .subscribe(result => {
        this.success = true;
        this.error = false;
        this.processing = false;
      }, err => {
        this.error = true;
        this.success = false;
        this.processing = false;
      })
    }
  }

  addLot() {
    let lot = <IQAuctionLot> {};
    this.lots.push(lot);
  }

}
