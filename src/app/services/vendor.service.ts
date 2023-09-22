import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../_interfaces/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

public getVendors = (route: string) => {
  return this.http.get<Vendor[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
}

private createCompleteRoute = (route: string, envAddress: string) => {
  return `${envAddress}/${route}`;
}
}
