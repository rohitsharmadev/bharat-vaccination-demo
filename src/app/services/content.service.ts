import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
const httpLoginOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),

  observe: 'response' as 'response'
}

@Injectable({
  providedIn: 'root'
})

export class ContentService {
  constructor(private http: HttpClient) { }

  getData(url: any) {
    return this.http.get<any[]>(url, httpOptions);
  }
}

