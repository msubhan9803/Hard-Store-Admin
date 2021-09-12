import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faq-detail-modal',
  templateUrl: './faq-detail-modal.component.html',
  styleUrls: ['./faq-detail-modal.component.scss']
})
export class FaqDetailModalModalComponent implements OnInit {
  public faq: any;
  @ViewChild('faqDetailTemp') faqDetailTemp: TemplateRef<any>;
  closeResult = '';
  errorMessage = "";
  disableSaveButton = false;
  faqForm: FormGroup;
  isEdit = false;
  isSubmit = false;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  open(faq, isEdit) {
    if (isEdit) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
    this.patchForm(faq)

    this.modalService.open(this.faqDetailTemp, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.faqForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: "Please fill all fields",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    this.productService.updateFaqById(this.faqForm.value).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated',
          showConfirmButton: false,
          timer: 1500
        });

        window.location.href = "/faq/faq-list";
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  createForm() {
    this.faqForm = this.fb.group({
      id: [''],
      type: ['Shipping', Validators.required],
      question: ['', Validators.required],
      answer: ['']
    })
  }

  patchForm(res) {
    this.faqForm.patchValue({
      id: res._id,
      type: res.type,
      question: res.question,
      answer: res.answer
    })
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
