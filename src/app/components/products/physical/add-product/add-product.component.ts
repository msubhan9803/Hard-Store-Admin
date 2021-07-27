import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;
  public counter: number = 1;
  public url = [{
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

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.productForm = this.fb.group({
      title: [''],
      type: [''],
      description: [''],
      // Change
      brand_id: [''],
      collections: [],
      // Change
      category_id: [''],
      sale: [null],
      stock: [null],
      new: [true],
      tags: [],
      Watch_Case_Shape: [''],
      Glass: [''],
      Watch_Feature: [],
      Model: [''],
      Dial_Size: [''],
      Watch_Case_Size: [''],
      Movement: [''],
      Watch_Movement_Country: [''],
      Strap_Material: [''],
      water_resistance: [true],
      Color_Family: [],
      variants: this.fb.array([]),
      // Change
      isWarranty: [true],
      warrantyPeriod: [null], // number,
      variantDummyValue: [null]
    })
  }

  collapseVariantImageArea() {
    this.isCollapsed = !this.isCollapsed;
  }

  variantSelectFieldChangeHandler() {
    this.variantsArray.push(this.fb.control({
      variantColor: this.productForm.value.variantDummyValue,
      images: []
    }));
    this.productForm.controls['variantDummyValue'].reset();
  }

  deleteVariant(index) {
    console.log("index: ", index)
    this.variantsArray.removeAt(index)
  }

  get variantsArray(): FormArray {
    return this.productForm.get("variants") as FormArray
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url[i].img = reader.result.toString();
    }
  }

  ngOnInit() {
  }

}
