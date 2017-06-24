import { Component, OnInit, Input, OnChanges, Pipe, PipeTransform, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm }    from '@angular/forms';

// ng2-datepicker added to meet gap of non-Chrome browser implementation of date select.
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { SchoolYear } from '../models/school-year';

@Component({
  selector: 'app-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css']
})
export class YearListComponent implements OnInit {

  constructor(
  	@Inject('schoolYearService') private schoolYearService
  	) { }

  schoolyears: SchoolYear[];
  selectedSchoolYear: SchoolYear;
  startDate: any;
  endDate: any;

// These fields added to support the ng2-datepicker
  date: DateModel;
  options: DatePickerOptions;

  loadSchoolYears() {
  	this.schoolYearService.getSchoolYears()
  												.subscribe(
  													schoolyears => this.schoolyears = schoolyears,
  														err => {
  															console.log(err);
  														});

  }

  onSelect(schoolYear: SchoolYear): void {
    this.selectedSchoolYear = schoolYear;
    this.startDate = this.formatFromDate(this.selectedSchoolYear.Year_Start_Date);
    this.endDate = this.formatFromDate(this.selectedSchoolYear.Year_End_Date);
  }

  addSchoolYear(value: any) {
    value.Year_Start_Date = this.formatToDate(value.Year_Start_Date);
    value.Year_End_Date = this.formatToDate(value.Year_End_Date);
    this.schoolYearService.addYear(value).subscribe(
      schoolyear => {
        this.loadSchoolYears();
        return true;
      },
      error => {
        console.error("Error saving year!");
        return Observable.throw(error);
      });
  }

  updateSchoolYear(value: any) {
    this.schoolYearService.updateYear(this.mapYear(value)).subscribe(
      v => {
        this.loadSchoolYears();
        return true;
      },
      error => {
        console.error("Error saving record!");
        return Observable.throw(error);
      }
    )
  }

  formatFromDate(value: any) {
    let formattedDate = {
      formatted: value.slice(0, 10)
    }
    return formattedDate;
  }

  formatToDate(dateObj: any) {
    let formattedDate = dateObj.formatted;
    return formattedDate;
  }

  setCheckboxFalse(val) {
    if(!val) {
      val = false;
    }
    return val;
  }

  mapYear(value: any) {
    let val = {
      Year_Description: value.Year_Description,
      Year_Start_Date: this.formatToDate(value.Year_Start_Date),
      Year_End_Date: this.formatToDate(value.Year_End_Date),
      Year_Active: this.setCheckboxFalse(value.Year_Active),
      Year_Planning: this.setCheckboxFalse(value.Year_Planning),
      Year_ID: this.selectedSchoolYear.Year_ID
    }
    return val;
  }

  ngOnInit() {
  	this.loadSchoolYears();
  }

}
