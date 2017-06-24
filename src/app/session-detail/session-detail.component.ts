import {Component, OnInit, Inject, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SchoolYear} from '../models/school-year';
import {Session} from '../models/session';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.css']
})
export class SessionDetailComponent implements OnInit {

  @Input() selectedSession: Session;

  constructor(
  	@Inject('schoolYearService') private schoolYearService,
  	@Inject('sessionService') private sessionService
  	) { }

  schoolyears: SchoolYear[];

  loadSchoolYears() {
  	this.schoolYearService.getSchoolYears()
  												.subscribe(
  													schoolyears => this.schoolyears = schoolyears,
  														err => {
  															console.log(err);
  														});

  }

  addSession(name, year_id) {
    let session = {Session_Name: name,
                      Year_ID: year_id};
    this.sessionService.addSession(session).subscribe(
        s => {
                       return true;
        },
          error => {
            console.error("Error saving year!");
            return Observable.throw(error);
          });
  }

  ngOnInit() {
  	this.loadSchoolYears();
  }

}
