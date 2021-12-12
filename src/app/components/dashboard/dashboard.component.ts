import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/shared/service/dashboard.service';
import { HelperMethodsService } from 'src/app/shared/service/helper-methods.service';
import { OrderService } from 'src/app/shared/service/order.service';
import { ProductService } from 'src/app/shared/service/product.service';
import Swal from 'sweetalert2';
import * as chartData from '../../shared/data/chart';
import { doughnutData, pieData } from '../../shared/data/chart';
import { UpdateCurrencyModalComponent } from '../update-currency/update-currency-modal/update-currency-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutData;
  public sourceDoughnutData;
  public orderList = [];
  public imageAddress = "";
  page = 1;
  pageSize = 10;
  public compareToLastMonth;
  public totalCancelOrders_Amount;
  public totalCancelOrders_count;
  public totalDeliveredOrder_Amount;
  public totalDeliveredOrder_count;
  public totalOrders_Amount;
  public totalOrders_count;
  public totalPendingOrder_Amount;
  public totalPendingOrders_count;
  public reviews;

  constructor(
    private dashboardService: DashboardService,
    private ordersService: OrderService,
    private productsService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) {
    // Object.assign(this, { doughnutData, pieData })
    // Source Doughnut Data
    // this.dashboardService.salesBySource().subscribe(
    //   (res: any) => {
    //     this.sourceDoughnutData = [
    //       {
    //         value: res.fb_count_amount,
    //         count: res.fb_count,
    //         name: "Facebook"
    //       },
    //       {
    //         value: res.web_count_amount,
    //         count: res.web_count,
    //         name: "Web"
    //       },
    //       {
    //         value: res.instagram_count_amount,
    //         count: res.instagram_count,
    //         name: "Instagram"
    //       },
    //       {
    //         value: res.whatsApp_count_amount,
    //         count: res.whatsApp_count,
    //         name: "Whatsapp"
    //       }
    //     ]
    //   },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: "Something went wrong!",
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }
    // )
  }

  // doughnut 2
  public view = chartData.view;
  public doughnutChartColorScheme = chartData.doughnutChartcolorScheme;
  public doughnutChartShowLabels = chartData.doughnutChartShowLabels;
  public doughnutChartGradient = chartData.doughnutChartGradient;
  public doughnutChartTooltip = chartData.doughnutChartTooltip;

  public chart5 = chartData.chart5;


  // lineChart
  public lineChartData = chartData.lineChartData;
  public lineChartLabels = chartData.lineChartLabels;
  public lineChartOptions = chartData.lineChartOptions;
  public lineChartColors = chartData.lineChartColors;
  public lineChartLegend = chartData.lineChartLegend;
  public lineChartType = chartData.lineChartType;

  // lineChart
  public smallLineChartData = chartData.smallLineChartData;
  public smallLineChartLabels = chartData.smallLineChartLabels;
  public smallLineChartOptions = chartData.smallLineChartOptions;
  public smallLineChartColors = chartData.smallLineChartColors;
  public smallLineChartLegend = chartData.smallLineChartLegend;
  public smallLineChartType = chartData.smallLineChartType;

  // lineChart
  public smallLine2ChartData = chartData.smallLine2ChartData;
  public smallLine2ChartLabels = chartData.smallLine2ChartLabels;
  public smallLine2ChartOptions = chartData.smallLine2ChartOptions;
  public smallLine2ChartColors = chartData.smallLine2ChartColors;
  public smallLine2ChartLegend = chartData.smallLine2ChartLegend;
  public smallLine2ChartType = chartData.smallLine2ChartType;

  // lineChart
  public smallLine3ChartData = chartData.smallLine3ChartData;
  public smallLine3ChartLabels = chartData.smallLine3ChartLabels;
  public smallLine3ChartOptions = chartData.smallLine3ChartOptions;
  public smallLine3ChartColors = chartData.smallLine3ChartColors;
  public smallLine3ChartLegend = chartData.smallLine3ChartLegend;
  public smallLine3ChartType = chartData.smallLine3ChartType;

  // lineChart
  public smallLine4ChartData = chartData.smallLine4ChartData;
  public smallLine4ChartLabels = chartData.smallLine4ChartLabels;
  public smallLine4ChartOptions = chartData.smallLine4ChartOptions;
  public smallLine4ChartColors = chartData.smallLine4ChartColors;
  public smallLine4ChartLegend = chartData.smallLine4ChartLegend;
  public smallLine4ChartType = chartData.smallLine4ChartType;

  public chart3 = chartData.chart3;

  @ViewChild(UpdateCurrencyModalComponent) updateCurrencyModalComponent: UpdateCurrencyModalComponent;

  // events
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  ngOnInit() {
    setTimeout(() => {
      this.updateCurrencyModalComponent.open();
    }, 1000)
    this.imageAddress = this.productsService.getImageUrl();

    // this.dashboardService.getLatestOrders().subscribe(
    //   (res: any) => {
    //     this.orderList = res.latest_5_orders;
    //   },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: "Something went wrong!",
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }
    // )
    // this.dashboardService.getTilesData().subscribe(
    //   (res: any) => {
    //     this.compareToLastMonth = res.compareToLastMonth;
    //     this.totalOrders_Amount = res.totalOrders_Amount;
    //     this.totalOrders_count = res.totalOrders_count;
    //     this.totalCancelOrders_Amount = res.totalCancelOrders_Amount;
    //     this.totalCancelOrders_count = res.totalCancelOrders_count;
    //     this.totalDeliveredOrder_Amount = res.totalDeliveredOrder_Amount;
    //     this.totalDeliveredOrder_count = res.totalDeliveredOrder_count;
    //     this.totalPendingOrder_Amount = res.totalPendingOrder_Amount;
    //     this.totalPendingOrders_count = res.totalPendingOrders_count;
    //   },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: "Something went wrong!",
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }
    // )
    // this.dashboardService.getMessages().subscribe(
    //   (res: any) => {
    //     console.log("getMessages: ", res)
    //     this.reviews = res.latest_5_reviews;
    //   },
    //   err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: "Something went wrong!",
    //       showConfirmButton: false,
    //       timer: 1500
    //     })
    //   }
    // )
  }
}
