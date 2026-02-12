import { EnvironmentUrlService } from './environment-url.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storeitem } from '../_interfaces/storeitem';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { }

public getStoreItems = (route: string) => {
  return this.http.get<Storeitem[]>(this.createCompleteRoute(route, this.envUrl.urlAddress));
}

private createCompleteRoute = (route: string, envAddress: string) => {
  return `${envAddress}/${route}`;
}

}
