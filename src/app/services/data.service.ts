import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://gopr-service.com.ua/orders.json'

  constructor(private _http: HttpClient) { }

  getData(){
    return this._http.get<UserData>(this.url);
  }
}
