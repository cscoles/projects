import { Component, OnInit, Input, OnChanges, Pipe, PipeTransform, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm }    from '@angular/forms';

// ng2-datepicker added to meet gap of non-Chrome browser implementation of date select.
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { SchoolYear } from '../models/school-year';

@Component({
  selector: 'app-schoolyear',
  templateUrl: './schoolyear.component.html',
  styleUrls: ['./schoolyear.component.css']
})
export class SchoolyearComponent implements OnInit {

  schoolyears: SchoolYear[];

// These fields added to support the ng2-datepicker
  date: DateModel;
  options: DatePickerOptions;

  constructor(
    @Inject('schoolYearService') private schoolYearService
  ) { }

  addSchoolYear(value: any) {
    value.Year_Start_Date = this.formatDate(value.Year_Start_Date);
    value.Year_End_Date = this.formatDate(value.Year_End_Date);
    this.schoolYearService.addYear(value).subscribe(
      schoolyear => {/* this.loadSchoolYears(); */
        return true;
      },
      error => {
        console.error("Error saving year!");
        return Observable.throw(error);
      });
  }

  formatDate(dateObj: any) {
    let formattedDate = dateObj.formatted;
    return formattedDate;
  }

  ngOnInit() {
  }

}
