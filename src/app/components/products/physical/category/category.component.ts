import { Component, OnInit } from '@angular/core';
import { categoryDB } from '../../../../shared/tables/category';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/shared/service/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public closeResult: string;
  public categories = [];
  public addCategoryForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private categoriesService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoriesService.getCategories().subscribe((categories: []) => {
      this.categories = categories;
    });
    this.createAddCategoryForm();
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

  addCategory(e) {
    console.log(e)
    this.categoriesService.addCategory(e).subscribe(res => {
      console.log("addCategory: ", res);
    })
  }

  public settings = {
    actions: {
      position: 'right'
    },
    columns: {
      category_Name: {
        title: 'Category',
      },
      sub_category_Name: {
        title: 'Sub Category',
      },
      slug: {
        title: 'Slug',
        type: 'html',
      },
    },
  };

  createAddCategoryForm() {
    this.addCategoryForm = this.fb.group({
      category_Name: ['', Validators.required],
      sub_category_Name: this.fb.array([]),
      slug: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
}
