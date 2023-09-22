import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Vendor } from '../_interfaces/vendor';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  public vendors!: Vendor[];
  cols!: any[];

  constructor(private vendorService: VendorService) { }

  ngOnInit() {
    this.getVendors();

    this.cols = [
      { field: "name", header: "Name" },
      { field: "address", header: "Address" },
      { field: "contact", header: "COntact" }
  ];
  }

  getVendors = () => {
    const apiAddress: string = "api/vendor";
    this.vendorService.getVendors(apiAddress)
    .subscribe({ //this.vendors = vendor
      next: (vendor: Vendor[]) => this.vendors = vendor,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

}
