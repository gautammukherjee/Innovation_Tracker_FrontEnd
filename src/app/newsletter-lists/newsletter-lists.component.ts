import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { GlobalVariableService } from './../services/common/global-variable.service';
import { NewsletterListsService } from '../services/newsletter-lists.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from "moment";

declare var jQuery: any;

@Component({
  selector: 'app-newsletter-lists',
  templateUrl: './newsletter-lists.component.html',
  styleUrls: ['./newsletter-lists.component.scss'],
  providers: [DatePipe]
})
export class NewsletterListsComponent implements OnInit {
  @Input() ProceedDoFilterApply?: Subject<any>; //# Input for ProceedDoFilter is getting from clinical details html
  private filterParams: any;
  result: any = [];
  newsletterListsRecords: any = [];

  loading = false;
  params: any;
  layout: any = {};
  graphData: any = [];
  diseaseCheck: any;
  //hideCardBody: boolean = true;
  modalRef: any;
  helpContents: any;


  constructor(
    private globalVariableService: GlobalVariableService,
    private newsletterListsService: NewsletterListsService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.filterParams = this.globalVariableService.getFilterParams();
    console.log("new Filters1: ", this.filterParams);
    // this.getNewsletterLists(this.filterParams);

    this.ProceedDoFilterApply?.subscribe(data => {  // Calling from details, details working as mediator
      console.log("data: ", data);
      if (data === undefined) { // data=undefined true when apply filter from side panel
        //this.hideCardBody = true;
        this.filterParams = this.globalVariableService.getFilterParams();
        this.getNewsletterLists(this.filterParams);
        console.log("new Filters for newsletter: ", this.filterParams);
      } else if (data.clickOn !== 'clickOnEventDetails') { // because graph should not change when click on this component itself
        // this.filterParams = this.globalVariableService.getFilterParams(this.globalVariableService.getChartFilterParams());
        this.getNewsletterLists(this.filterParams);
      }
    });
    this.getNewsletterLists(this.filterParams);
  }

  getNewsletterLists(_filterParams: any) {
    this.loading = true;

    this.diseaseCheck = _filterParams['di_ids']; // if disease_id is checked
    console.log("checked here Disease in event description: ", this.diseaseCheck);
    //if (this.diseaseCheck !== undefined) {
    this.newsletterListsService.getNewsletterLists(_filterParams).subscribe(
      data => {
        this.result = data;
        this.newsletterListsRecords = this.result.newsletterRecords;
        console.log("showNewsletterListsData: ", this.newsletterListsRecords);

      },
      err => {
        console.log(err.message);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
    // }
    // else {
    //   this.newsletterListsRecords = [];
    //   this.loading = false;
    // }
  }

  // reloadDescription() {
  //   console.log("Event description: ")
  //   // this.globalVariableService.resetChartFilter();
  //   this.hideCardBody = !this.hideCardBody;
  //   this.filterParams = this.globalVariableService.getFilterParams();
  //   if (!this.hideCardBody)
  //     this.getNewsletterLists(this.filterParams);

  // }

  // help(helpDesc) {
  //   this.helpContents = "Event Description";
  //   this.modalRef = this.modalService.open(helpDesc, { size: 'lg' });
  // }

}
