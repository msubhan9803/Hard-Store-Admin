import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/shared/service/blog.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.scss']
})
export class UpdateCurrencyComponent implements OnInit {
  public closeResult: string;
  public counter: number = 1;
  currencyForm: FormGroup;
  public isSubmit = false;

  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(1, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(3, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' })
  ];
  public blog = "";
  public file: any;
  public fileData: File = null;
  public previewUrl: any = undefined;

  public config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    width: 'auto',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      // ['bold'],
      [
        'insertImage',
        'insertVideo'
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private blogService: BlogService,
    config: NgbRatingConfig,
    private userService: UserService
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.createForm();
    this.userService.getCurrency().subscribe(res => {
      this.patchForm(res);
    })
  }

  onSubmit() {
    this.isSubmit = true;

    console.log("here.. : ", this.currencyForm)

    if (this.currencyForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: "Please fill all fields",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    this.recalculate();

    this.userService.updateCurrency(this.currencyForm.value).subscribe(
      (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Updated Conversion Rate',
          showConfirmButton: false,
          timer: 1500
        });

        window.location.reload();
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

  recalculate() {
    let dollarVal = parseFloat(this.currencyForm.controls['Dollar'].value);
    let aedVal = parseFloat(this.currencyForm.controls['AED'].value);
    let conversionVal = parseFloat(this.currencyForm.controls['conversionRate'].value);

    conversionVal = dollarVal / aedVal;

    this.currencyForm.controls['conversionRate'].setValue(conversionVal)
  }

  createForm() {
    this.currencyForm = this.fb.group({
      Dollar: ['', Validators.required],
      AED: ['', Validators.required],
      conversionRate: ['', Validators.required]
    })
  }

  patchForm(res) {
    this.currencyForm.patchValue({
      Dollar: res.Dollar,
      AED: res.AED,
      conversionRate: res.conversionRate
    })
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  addTagFn(name) {
    return name;
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {

      this.previewUrl = reader.result;
      this.file = this.previewUrl;
    }
  }
}
