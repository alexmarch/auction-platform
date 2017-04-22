import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { IQAuction } from '../qauction-card/qauction.service';
import 'rxjs/add/operator/map';

declare var Pusher: any;

@Injectable()
export class ApiService {

  API_URL: string = 'https://15vj4izds1.execute-api.eu-west-1.amazonaws.com/dev';

  pusher: any;

  constructor(private _http: Http) {

    Pusher.logToConsole = true;

    this.pusher = new Pusher('42f980d0d947a986306f', {
      encrypted: true
    });

   }
  /**
   * Create qauction
   *
   * @param {IQAuction} qauction
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  createQA(qauction : IQAuction): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.post(`${API_URL}/qauctions`, qauction)
      .map(res => res.json())
  }
  /**
   * Update qauction
   *
   * @param {IQAuction} qauction
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  updateQA(qauction : IQAuction): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.put(`${API_URL}/qauctions/${qauction.id}`, qauction)
      .map(res => res.json())
  }
  /**
   * Get QA by ID
   *
   * @param {IQAuction} qauction
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  getQA(qauction : IQAuction): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.get(`${API_URL}/qauctions/${qauction.id}`)
      .map(res => res.json())
  }
  /**
   * Delete qauction
   *
   * @param {IQAuction} qauction
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  deleteQA(qauction : IQAuction): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.delete(`${API_URL}/qauctions/${qauction.id}`, qauction)
      .map(res => res.json())
  }
  /**
   * Get by UserID
   *
   * @param {IQAuction} qauction
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  getQAByUserId(userId : string): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.get(`${API_URL}/qauctions/user/${userId}`)
      .map(res => res.json())
  }
  /**
   * Get Started QA
   *
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  getLiveQA(): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.get(`${API_URL}/qauctions/live`)
      .map(res => res.json())
  }
  /**
   *
   *
   * @param {Array<string>} list
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  public getFavList(list: Array<string>): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.post(`${API_URL}/qauctions/favlist`, {list})
      .map(res => res.json())
  }
  /**
   * Place user bid for lot
   *
   * @param {string} auctionId
   * @param {string} userId
   * @param {Number} bidValue
   * @param {Number} lotIndex
   * @returns {Observable<any>}
   *
   * @memberOf ApiService
   */
  placeBid(auctionId: string, userId: string, bidValue: Number, lotIndex: Number): Observable<any> {
    let API_URL = this.API_URL;
    return this._http.post(`${API_URL}/qauctions/bid/${auctionId}`,{userId, bidValue, lotIndex})
      .map(res => res.json())
  }
  /**
   *
   *
   * @param {string} id
   * @returns {*}
   *
   * @memberOf ApiService
   */
  sub( id: string ): any {
    return this.pusher.subscribe(id);
  }
}
