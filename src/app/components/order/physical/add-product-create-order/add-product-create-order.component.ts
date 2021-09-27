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
  @Input() selectedProduct ={
    id: "",
    name: "",
    variant: "",
    sellerSku: "",
    unitCost: null,
    quantity: null,
    discount: null,
    subTotal: null,
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
    name: "",
    variant: "",
    sellerSku: "",
    unitCost: null,
    quantity: null,
    discount: null,
    subTotal: null,
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
    this.modalService.open(this.orderStatusTemp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.selectedProduct = this.product;
    this.addProductEvent.emit(JSON.stringify(this.selectedProduct));
    this.modalService.dismissAll();
  }

  handleProductSelection() {
    let product = this.proudctsList.find(product => product.title == this.selectedProductName);

    this.productService.getProductById(product._id).subscribe((res: any) => {
      this.product.id = res._id;
      this.product.name = res.title;
      this.product.variant = res.skuArray[0].watchStrapColor;
      this.product.sellerSku = res.skuArray[0].sellerSku;
      this.product.unitCost = parseFloat(res.skuArray[0].price);
      this.product.quantity = 1;
      this.product.discount = res.sale ? this.product.unitCost - parseFloat(res.skuArray[0].specialPrice) : 0;
      this.product.imageUrl = res.variants[0].imagesPreview[0];
      this.product.subTotal = (this.product.unitCost - this.product.discount) * this.product.quantity;
    })
  }

  onQuantityChange() {
    this.product.subTotal = (this.product.unitCost - this.product.discount) * this.product.quantity;
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
