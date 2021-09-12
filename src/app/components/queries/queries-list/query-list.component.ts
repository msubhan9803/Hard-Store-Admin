import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { QueryDetailComponent } from '../query-detail/query-detail.component';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueriesListComponent implements OnInit {
  public queryList = [];
  page = 1;
  pageSize = 10;
  @ViewChild(QueryDetailComponent) queryDetailComponent: QueryDetailComponent;
  math = Math;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getContactMessages().subscribe((res: []) => {
      this.queryList = res;
    })
  }
}
