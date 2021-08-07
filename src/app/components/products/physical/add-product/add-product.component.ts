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
      ['bold']
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
    "Collection 1",
    "Collection 2",
    "Collection 3"
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
    if (this.productForm.invalid) {
      console.log(this.productForm);

      Swal.fire({
        icon: 'error',
        title: "Please fill required fields",
        showConfirmButton: false,
        timer: 1500
      })

      return;
    }
    console.log("this.productForm: ", this.productForm.value)
    console.log("this.variantsArray: ", this.variantsArray)
    console.log("this.skuArray: ", this.skuArray)

    let payload = this.productForm.value;
    payload.variants = this.variantsArray;
    for (let index = 0; index < payload.variants.length; index++) {
      const variant = payload.variants[index];
      delete payload.variants[index].collapse;
    }
    payload.skuArray = this.skuArray;

    console.log("payload: ", JSON.stringify(payload))
    this.productsService.addProduct(payload).subscribe(
      res => {
        console.log("addProduct: ", res);

        Swal.fire({
          icon: 'success',
          title: 'Successfully Added',
          showConfirmButton: false,
          timer: 1500
        });
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
      // type: [''],
      description: [''],
      // Change
      brand: ['', Validators.required],
      collections: [],
      // Change
      // category_id: [''],
      sale: [true],
      new: [true],
      tags: [""],
      // Watch_Case_Shape: [''],
      // Glass: [''],
      // Watch_Feature: [],
      // Model: [''],
      // Dial_Size: [''],
      // Watch_Case_Size: [''],
      // Movement: [''],
      // Watch_Movement_Country: [''],
      // Strap_Material: [''],
      // water_resistance: [true],
      // Color_Family: [],
      variants: this.fb.array([]),
      // Change
      // isWarranty: [true],
      // warrantyPeriod: [null], // number
      skuArray: [[]] as Array<Object>
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

  variantImageAdded(files, index, e) {
    console.log("files: ", files)
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const file = files[fileIndex];
      console.log("file: ", file)
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
        this.variantsArray[index].imagesPreview.push({
          fileName: file.name,
          base64: event.target.result
        })
        console.log("this.variantsArray: ", this.variantsArray)
      }
    }
  }

  onVariantImageRemove(arrayIndex, fileIndex) {
    // this.variantsArray[arrayIndex].images.splice(fileIndex, 1)
    this.variantsArray[arrayIndex].imagesPreview.splice(fileIndex, 1)
  }

  setImageAsImageThumbnail(imageIndex, variantIndex) {
    console.log("imageIndex: ", imageIndex)
    console.log("variantIndex: ", variantIndex)

    this.variantsArray[variantIndex].isThumbnailImageIndex = imageIndex;
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
  }
}
