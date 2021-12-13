import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { LocalDataSource } from 'ng2-smart-table';
import { product } from 'src/app/shared/models/product';
import { CategoryService } from 'src/app/shared/service/category.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;
  public counter: number = 1;
  public isSubmit = false;
  public categories = [];
  source: LocalDataSource;
  files: File[] = [];
  variantsArray = [];
  variantDummyValue = "";
  skuArray = [];

  public url = [
    {
      img: "assets/images/user.png",
    },
    {
      img: "assets/images/user.png",
    },
    {
      img: "assets/images/user.png",
    },
    {
      img: "assets/images/user.png",
    },
    {
      img: "assets/images/user.png",
    }
  ];
  public isCollapsed = false;

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
      // ['bold']
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
  public collectionsData = [
    // "New",
    "On Sale",
    "All",
    "Best Seller",
  ]
  public tagsData = [
    "Tag 1",
    "Tag 2",
    "Tag 3"
  ]
  public watchFeaturesData = [
    "Chronograph",
    "Compass",
    "GPS",
    "Countdown"
  ]
  public colorFamilyData = [
    "Blue",
    "Gold",
    "Silver",
    "Black"
  ]
  public variantsColorData = [
    "Black",
    "Blue",
    "Green",
    "White"
  ]
  public dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  public skuTableSettings = {
    hideSubHeader: true,
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'right'
    },
    columns: {
      watchStrapColor: {
        title: 'Watch Strap Color',
      },
      specialPrice: {
        title: 'Special Price'
      },
      stock: {
        title: 'Stock'
      },
      price: {
        title: 'Price'
      },
      sellerSku: {
        title: 'Seller SKU'
      }
      // freeItems: {
      //   title: 'Free Items'
      // }
    },
  };

  constructor(
    private fb: FormBuilder,
    private productsService: ProductService,
  ) {
    this.createForm();
    this.source = new LocalDataSource();
    this.source.load(this.skuArray);
  }

  onSubmit() {
    this.isSubmit = true;

    if (this.productForm.value.collections.length == 0) {
      return;
    }

    if (this.productForm.value.description == "") {
      return;
    }

    if (this.productForm.value.images.length == 0) {
      Swal.fire({
        icon: 'error',
        title: "Please Add at least 3 images",
        showConfirmButton: false,
        timer: 1500
      })

      return;
    }

    if (this.productForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: "Please fill required fields",
        showConfirmButton: false,
        timer: 1500
      })

      return;
    }

    let payload = this.productForm.value;
    payload.Images = payload.images;

    console.log("payload: ", payload)
    this.productsService.addProduct(payload).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Added',
          showConfirmButton: false,
          timer: 1500
        });

        window.location.href = "/admin/#/products/physical/product-list";
      },
      err => {
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

  createForm() {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      brand: ['', Validators.required],
      collections: [''],
      tags: [''],
      sale: ['', Validators.required],
      new: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      images: ['']
    })
  }

  collapseVariantImageArea(index) {
    this.variantsArray[index].collapse = !this.variantsArray[index].collapse;
  }


  variantSelectFieldChangeHandler() {
    this.variantsArray.push({
      variantIndex: this.variantsArray.length,
      variantColor: this.variantDummyValue,
      // images: [],
      imagesPreview: [],
      collapse: false,
      isThumbnailImageIndex: 0,
      isAvailable: true
    });
    this.skuArray.push({
      variantIndex: this.variantsArray.length - 1,
      watchStrapColor: this.variantDummyValue,
      specialPrice: "",
      stock: "",
      price: "",
      sellerSku: ""
      // freeItems: "",
    });
    this.source.refresh();
    this.variantDummyValue = null;
  }

  editVariant(index) {
    this.skuArray = this.skuArray.filter(sku => {
      if (sku.variantIndex == index) {
        sku.watchStrapColor = this.variantsArray[index].variantColor;
      }
      return sku;
    })
    this.source.load(this.skuArray)
  }

  deleteVariant(index) {
    this.variantsArray.splice(index, 1)
    this.skuArray = this.skuArray.filter(sku => sku.variantIndex != index);
    this.source.load(this.skuArray)
  }

  addTagFn(name) {
    return name;
  }

  variantImageAdded(files, e) {
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      var mimeType = e.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please upload an image only!'
        })
        return;
      }

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.productForm.patchValue({
          ...this.productForm.value,
          images: [
            ...this.productForm.value.images,
            {
              base64: event.target.result,
              ImageName: file.name,
              IsThmubnail: this.productForm.value.images.length == 0 ? true : false
            }
          ]
        })
      }
    }
  }

  onVariantImageRemove(fileIndex) {
    let tempFile = this.productForm.value.images[fileIndex];
    this.productForm.value.images = this.productForm.value.images.filter((file, index) => fileIndex !== index);

    if (tempFile.IsThmubnail == true) {
      this.productForm.value.images[0].IsThmubnail = true;
    }
  }

  setImageAsImageThumbnail(fileIndex) {
    this.productForm.value.images = this.productForm.value.images.map((file, index) => {
      let temp = file;
      if (fileIndex == index) {
        temp.IsThmubnail = true;
        return temp;
      } else {
        temp.IsThmubnail = false;
        return temp;
      }
    });
  }

  onCreateConfirmSKU(e) {
    this.skuArray.push(e.newData);
  }
  onEditConfirmSKU(e) {
    console.log(e)
    // this.categoriesService.addProduct(e).subscribe(res => {
    //   console.log("addCategory: ", res);
    // })
  }
  onDeleteConfirmSKU(e) {
    console.log(e)
    // this.categoriesService.addCategory(e).subscribe(res => {
    //   console.log("addCategory: ", res);
    // })
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  ngOnInit() {
    this.productsService.getCategories().subscribe((res: []) => this.categories = res);
  }
}
