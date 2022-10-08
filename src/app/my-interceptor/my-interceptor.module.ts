import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MyInterceptorModule implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    httpRequest.clone({
      headers: httpRequest.headers
      .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      .set('Access-Control-Allow-Origin', 'https://gopr-service.com.ua/orders.json')
  })
    return next.handle(httpRequest);
  }
}
