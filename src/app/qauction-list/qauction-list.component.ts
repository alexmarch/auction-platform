import { Component, OnInit } from '@angular/core';
import { IQAuction, QauctionService } from '../qauction-card/qauction.service';
import { ApiService } from '../common/api.service';



@Component({
  selector: 'app-qauction-list',
  templateUrl: './qauction-list.component.html',
  styleUrls: ['./qauction-list.component.css']
})
export class QauctionListComponent implements OnInit {
  auctions: Array<IQAuction> = [];
  constructor(
    private _qauction: QauctionService,
    private _api: ApiService
  ) { }

  ngOnInit() {
    // this.auctions = this._qauction.getAuctionList();
    this._api.getLiveQA().subscribe( qauctions => {
      this.auctions = qauctions;
    })
  }

}
