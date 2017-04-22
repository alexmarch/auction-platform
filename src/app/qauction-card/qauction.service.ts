import { User } from '../common/user.service';
import { Injectable } from '@angular/core';

/**
 *
 *
 * @enum {number}
 */
enum States {
  start = 1,
  stop = 2,
  pending = 3
}
/**
 *
 *
 * @interface IQAuctionLot
 */
interface IQAuctionLot {
  name: String,
  comments?: String,
  imageUrl?: String,
  startPrice: Number,
  currentPrice?: Number
}
/**
 *
 *
 * @interface IQAuction
 */
interface IQAuction {
  name: string,
  auctionId?: string,
  description: string,
  state: States,
  lots?: Array<IQAuctionLot>,
  user?: User,
  id?: string
}

/**
 *
 *
 * @class QauctionService
 */
@Injectable()
class QauctionService {
  auctions: Array<IQAuction>;
  notify: Array<any> = [];
  constructor() { }

  addNewAuction(auction: IQAuction){
    this.auctions.push(auction);
  }
  /**
   * getAuctionList
   *
   * @param {boolean} [isAll]
   * @returns {Array<IQAuction>}
   *
   * @memberOf QauctionService
   */
  getAuctionList( isAll?: boolean ): Array<IQAuction> {
    if (this.auctions) {
      if ( !isAll ) {
        return this.auctions.filter( auction => auction.state === States.start );
      }
      return this.auctions;
    }
    return [];
  }
  /**
   *
   *
   * @param {IQAuction} qauction
   * @returns {boolean}
   *
   * @memberOf QauctionService
   */
  isFav( id: string ): boolean {
    let favlist: any = localStorage.getItem('app-favlist');
    if ( favlist ) {
      favlist = JSON.parse(favlist);
    } else {
      favlist = [];
    }
    if ( favlist.indexOf(id) < 0 ) {
      return false;
    }
    return true;
  }
  /**
   *
   *
   * @param {string} id
   *
   * @memberOf QauctionService
   */
  addFav( id: string ): void {
    let favlist:any = localStorage.getItem('app-favlist');
    if ( favlist ) {
      favlist = JSON.parse(favlist);
    } else {
      favlist = [];
    }
    favlist.push(id);
    localStorage.setItem('app-favlist', JSON.stringify(favlist));
  }
  /**
   *
   *
   * @param {string} id
   *
   * @memberOf QauctionService
   */
  removeFav( id: string ): void {
    let favlist: Array<string> = Array<string>(localStorage.getItem('app-favlist')) || [];
    favlist.indexOf(id);
    favlist.splice(Number(id), 1);
    localStorage.setItem('app-favlist', JSON.stringify(favlist));
  }
  /**
   * Get fav list
   *
   * @returns {Array<string>}
   *
   * @memberOf QauctionService
   */
  getFavList(): Array<string> {
    let favlist: string  = localStorage.getItem('app-favlist');
    let result: Array<string>;
    if ( favlist ) {
      result = <Array<string>> JSON.parse(favlist);
    } else {
      result = [];
    }
    return result;
  }

  addNotifyItem( item: any ) {
    this.notify.push(item);
  }
  /**
   *
   *
   * @param {IQAuctionLot} lot
   * @param {IQAuction} auction
   *
   * @memberOf QauctionService
   */
  placeBid(lot: IQAuctionLot, auction: IQAuction, index: Number,  id: string): void {
    // @TODO: Need send req to DB, also need after
    console.log(lot, auction, index, id);
  }
}

export { IQAuction,  IQAuctionLot, States, QauctionService }

