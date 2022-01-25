import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from 'src/app/shared/service/blog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class BlogDetailComponent implements OnInit {
  public closeResult: string;
  public counter: number = 1;
  blogForm: FormGroup;
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
  public modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private blogService: BlogService,
    private spinner: NgxSpinnerService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = false;
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.isSubmit = true;

    console.log("here.. : ", this.blogForm)

    if (this.blogForm.value.tags.length == 0) {
      return;
    }

    if (!this.fileData) {
      Swal.fire({
        icon: 'error',
        title: "Please Upload an Image",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    if (this.blogForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: "Please fill all fields",
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }

    this.spinner.show();
    this.blogForm.controls['file'].setValue(this.previewUrl);
    this.blogForm.controls['filename'].setValue(this.fileData.name);

    let payload = this.blogForm.value;
    // payload.ImageName = this.blogForm.value.filename;
    this.blogService.createBlog(this.blogForm.value).subscribe(
      (res: any) => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Successfully Added',
          showConfirmButton: false,
          timer: 1500
        });

        window.location.href = "/admin/#/blogs/blog-list";
      },
      err => {
        this.spinner.hide();
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
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      slug: ['', Validators.required],
      file: [''],
      filename: [''],
      tags: [[]],
      description: ['', Validators.required]
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

  test = (event) => {
    console.log(event.keyCode);
  };

  onSelectionChanged = (event) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  onContentChanged = (event) => {
    //console.log(event.html);
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
}
