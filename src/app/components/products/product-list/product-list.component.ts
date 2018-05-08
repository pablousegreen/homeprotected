import { Component, OnInit } from '@angular/core';

//services
import {ProductService} from '../../../services/product.service';

// toastr
import { ToastrService } from 'ngx-toastr';

//product
import {Product} from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList : Product[];

  constructor(private productService: ProductService,
  private toastr: ToastrService) { }

  ngOnInit() {
    return this.productService.getProducts()
    .snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      });
    })
  }

  onEdit(product: Product){
      this.productService.selectedProduct= Object.assign({},product);
  }


  onDelete($key: string){
    if(confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }


}
