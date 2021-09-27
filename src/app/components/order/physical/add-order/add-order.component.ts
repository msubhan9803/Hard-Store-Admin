import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalDataSource } from 'ng2-smart-table';
import { product } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/service/category.service';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { UserService } from 'src/app/shared/service/user.service';
import Swal from 'sweetalert2';
import { AddProductCreateOrderComponent } from '../add-product-create-order/add-product-create-order.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  public checkoutForm: FormGroup;
  public counter: number = 1;
  public isSubmit = false;
  public isCollapsed = false;
  public countryList = [];
  source: LocalDataSource;
  proudctsArray = [];
  public conversionRate;
  product_List = [];
  @ViewChild(AddProductCreateOrderComponent) addProductCreateOrderComponent: AddProductCreateOrderComponent;
  selectedProduct = {
    id: "",
    name: "",
    variant: "",
    sellerSku: "",
    unitCost: null,
    quantity: null,
    discount: null,
    subTotal: null,
    imageUrl: ""
  }

  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  public productTableSettings = {
    actions: {
      add: true,
      edit: true,
      delete: true,
      position: 'right'
    },
    columns: {
      product_name: {
        title: 'Product Name',
      },
      product_Id: {
        title: 'Product Id'
      },
      unit_Cost: {
        title: 'Unit Cost'
      },
      quantity: {
        title: 'Quantity'
      },
      discount: {
        title: 'Special Price'
      },
      amount: {
        title: 'Amount'
      }
    },
  };

  public sourceList = [
    "Facebook",
    "Instagram",
    "Whatsapp"
  ]

  constructor(
    private fb: FormBuilder,
    private productsService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
    private checkoutService: CheckoutService
  ) {
    this.createForm();
    this.source = new LocalDataSource();
    this.source.load(this.proudctsArray);
  }

  async ngOnInit() {
    this.countryList = this.checkoutService.countryList.filter(item => item.name);
    await this.userService.getCurrency().toPromise().then((res: any) => {
      this.conversionRate = res.conversionRate;
    })
  }

  async onSubmit() {
    if (this.checkoutForm.invalid) return;

    this.checkoutForm.value.products = this.proudctsArray;
    let payload = this.checkoutForm.value;

    let totalAmount = 0;
    for (let index = 0; index < this.proudctsArray.length; index++) {
      const product = this.proudctsArray[index];
      totalAmount += parseInt(product.amount);
    }
    payload.totalAmount = totalAmount;

    let checkoutFormValue = this.checkoutForm.value;
    checkoutFormValue.phone = this.checkoutForm.value.DailCode + this.checkoutForm.value.phone;
    checkoutFormValue.Country = this.checkoutForm.value.Country.name ? this.checkoutForm.value.Country.name : this.checkoutForm.value.Country;
    checkoutFormValue.paymentStatus = true;

    // Setting total
    let total = 0;
    for (let index = 0; index < this.product_List.length; index++) {
      const product = this.product_List[index];
      total = total + product.sub_Total;
    }
    this.checkoutForm.value.totalAmount = total;
    this.checkoutForm.value.products = this.product_List;

    this.orderService.createOrderAPI(checkoutFormValue).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Placed Order',
          showConfirmButton: false,
          timer: 1500
        });
        this.resetForm();

        window.location.href = "/admin/#/orders/order-list";
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: 'Internal Server Error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  resetForm() {
    this.checkoutForm.reset();
    this.checkoutForm.controls['Country'].setValue('United Arab Emirates')
    this.checkoutForm.controls['DailCode'].setValue('+971')
  }

  addProductHandler(value) {
    if (value !== "") {
      let product = JSON.parse(value)
      let productIndex = -1;
      let foundProduct = {};

      for (let index = 0; index < this.product_List.length; index++) {
        const currentPr = this.product_List[index];
        if (currentPr.id == product.id) {
          productIndex = index;
          foundProduct = currentPr;
        }
      }
      if (productIndex !== -1) {
        this.product_List[productIndex].quantity = this.product_List[productIndex].quantity + product.quantity;
        return;
      }
      this.product_List.push(product);
    }
  }

  onChange($event) {
    this.checkoutForm.controls['DailCode'].setValue($event.dial_code)
  }

  onCreateConfirmSKU(e) {
    this.proudctsArray.push(e.newData);
  }

  onEditConfirmSKU(e) {
    console.log(e)
  }

  onDeleteConfirmSKU(e) {
    console.log(e)
  }

  deleteProduct(index) {
    this.product_List.splice(index, 1);
  }

  createForm() {
    this.checkoutForm = this.fb.group({
      first_Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      last_Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', [Validators.required, Validators.maxLength(50)]],
      Country: ['United Arab Emirates', Validators.required],
      DailCode: ['+971'],
      City: ['', Validators.required],
      State: ['', Validators.required],
      postalCode: ['', Validators.required],
      products: [[]],
      source: ['']
    })
  }
}
