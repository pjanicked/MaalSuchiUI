import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { StoreService } from '../services/store.service';
import { Storeitem } from '../_interfaces/storeitem';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
  public storeItems!: Storeitem[];
  cols!: any[];
  selectedProducts!: Storeitem[];
  public storeItem!: Storeitem;
  submitted!: boolean;
  itemDialog!: boolean;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.getStoreItems();

    this.cols = [
      { field: "", header: "" },
      { field: "name", header: "Name" },
      { field: "quantity", header: "Quantity" },
      { field: "notes", header: "Notes" },
      { field: "action", header: "Action" },
  ];
  }

  getStoreItems = () => {
    const apiAddress: string = "api/store";
    this.storeService.getStoreItems(apiAddress)
    .subscribe({ 
      next: (item: Storeitem[]) => this.storeItems = item,
      error: (err: HttpErrorResponse) => console.log(err)
    })
  }

  addNewItem() {
    this.storeItem = {};
    this.submitted = false;
    this.itemDialog = true;
  }

  deleteSelectedItem() {
    //[disabled]="!selectedProducts || !selectedProducts.length"
  }

  hideDialog() {
    this.itemDialog = false;
    this.submitted = false;
  }

  editItem(item: Storeitem) {
    this.storeItem = {...item};
    this.itemDialog = true;
  }

  deleteItem(item: Storeitem) {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete ' + product.name + '?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter(val => val.id !== product.id);
    //         this.product = {};
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    //     }
    // });
  }

  saveItem() {
    this.submitted = true;

    if (this.storeItem.name!.trim()) {
        if (this.storeItem.id) {
            this.storeItems[this.findIndexById(this.storeItem.id)] = this.storeItem;
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.storeItems.push(this.storeItem);
            //this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.storeItems = [...this.storeItems];
        this.itemDialog = false;
        this.storeItem = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.storeItems.length; i++) {
        if (this.storeItems[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

}
