import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { take, map } from 'rxjs/operators';
import { AppProduct } from 'src/app/models/app.product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  product: any = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(id);

    if (this.id) this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => {
      this.product = p;
      //console.log(this.product)
    });

  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);    
    //console.log(product);
    this.router.navigate(['/admin/products'])
  }

  ngOnInit(): void {
  }

}
