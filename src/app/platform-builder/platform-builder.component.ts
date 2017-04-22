import { AwsCognitoService } from '../common/aws-cognito.service';
import { Component, OnInit } from '@angular/core';
import { IQAuction, QauctionService } from '../qauction-card/qauction.service';
import { User } from '../common/user.service';
import { ApiService } from '../common/api.service';
const MAX_QAUCTION_ITEMS = 6;

@Component({
  selector: 'app-platform-builder',
  templateUrl: './platform-builder.component.html',
  styleUrls: ['./platform-builder.component.css']
})
export class PlatformBuilderComponent implements OnInit {
  auctions: Array<IQAuction> = [];
  user: User;
  constructor(
    private _qauction: QauctionService,
    private _api: ApiService,
    private _awsCognito: AwsCognitoService) { }

  addNewQAuction() {
    let qauction:IQAuction;
    if ( MAX_QAUCTION_ITEMS > this.auctions.length ) {

      qauction = <IQAuction> {
          name: '',
          lots: [],
          user: this.user
      };

      this.auctions.push(
        qauction
      );

      this._qauction.auctions = this.auctions;
    }
  }

  ngOnInit() {
     this.auctions = this._qauction.getAuctionList(true) || [];
     this._awsCognito.getCurrentUser((err, attrs) => {
      if ( !err ) {
        this.user = attrs;
        this._api.getQAByUserId(this.user.id).subscribe(qauctions=>{
          this.auctions = qauctions;
        })
        this._api.sub(this.user.id).bind('bid', data => {
          this._qauction.addNotifyItem(data);
        })
      }
    });
  }

  removeQAuction ( auction ) {
    this._api.deleteQA(auction).subscribe( res => {
      this.auctions.splice(this.auctions.indexOf(auction), 1);
    });
  }

}
