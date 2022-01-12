import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product-create-order',
  templateUrl: './add-product-create-order.component.html',
  styleUrls: ['./add-product-create-order.component.scss']
})
export class AddProductCreateOrderComponent implements OnInit {
  @Input() selectedProduct = {
    id: "",
    product_name: "",
    variant: "",
    sellerSku: "",
    unit_Cost: null,
    quantity: null,
    discount: null,
    sub_Total: null,
    imageUrl: ""
  };

  @Output() addProductEvent = new EventEmitter<string>();
  public order: any;
  @ViewChild('orderStatusTemp') orderStatusTemp: TemplateRef<any>;
  closeResult = '';
  errorMessage = "";
  disableSaveButton = false;
  currentChangedKey = "";
  selectedProductName = "";
  public imageAddress = "";
  proudctsList = [];
  product = {
    id: "",
    product_name: "",
    variant: "",
    sellerSku: "",
    unit_Cost: null,
    quantity: null,
    discount: null,
    sub_Total: null,
    imageUrl: ""
  }

  constructor(
    private modalService: NgbModal,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProductsName().subscribe((res: []) => {
      this.proudctsList = res;
    })
    this.imageAddress = this.productService.getImageUrl();
  }

  open() {
    this.resetState();
    this.modalService.open(this.orderStatusTemp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  resetState() {
    this.selectedProductName = "";
    this.product = {
      id: "",
      product_name: "",
      variant: "",
      sellerSku: "",
      unit_Cost: null,
      quantity: null,
      discount: null,
      sub_Total: null,
      imageUrl: ""
    }
  }

  onSubmit() {
    this.selectedProduct = this.product;
    this.addProductEvent.emit(JSON.stringify(this.selectedProduct));
    this.modalService.dismissAll();
  }

  closeModal() {
    this.resetState();
    this.modalService.dismissAll();
  }

  handleProductSelection() {
    let product = this.proudctsList.find(product => product.title == this.selectedProductName);

    this.productService.getProductById(product._id).subscribe((res: any) => {
      this.product.id = res._id;
      this.product.product_name = res.title;
      this.product.unit_Cost = parseFloat(res.price);
      this.product.quantity = 1;
      this.product.discount = res.discount;
      this.product.imageUrl = res.images[0].URL;
      this.product.sub_Total = res.sale ? (this.product.unit_Cost - this.product.discount) * this.product.quantity :  this.product.unit_Cost * this.product.quantity;
    })
  }

  onQuantityChange() {
    this.product.sub_Total = (this.product.unit_Cost - this.product.discount) * this.product.quantity;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public capitalizeFirstLetter(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }
}
