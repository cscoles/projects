import { Component, OnInit, Input, OnChanges, Pipe, PipeTransform, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Session } from '../models/session';
import { SchoolYear } from '../models/school-year';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { isNumeric } from 'rxjs/util/isNumeric';


@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  private selectedSession: Session;

  constructor(
  	@Inject('sessionService') private sessionService,
    @Inject('schoolYearService') private schoolYearService,
    private router: Router
  	) { }

  sessions: Session[];
  schoolyears: SchoolYear[];

  loadSessions() {
  	this.sessionService.getSessions()
  												.subscribe(
  													s => this.sessions = s,
  														err => {
  															console.log(err);
  														});
  }

  onSelect(session: Session): void {
    this.selectedSession = session;
    this.loadSchoolYears();
  }

  addSession(value: any) {
    this.sessionService.addSession(value).subscribe(
      s => {
        this.loadSessions();
        return true;
      },
      error => {
        console.error("Error saving year!");
        return Observable.throw(error);
      });
  }

  loadSchoolYears() {
    this.schoolYearService.getSchoolYears()
      .subscribe(
        schoolyears => this.schoolyears = schoolyears,
        err => {
          console.log(err);
        });
  }

  updateSession(value: any) {
    this.sessionService.updateSession(this.mapSession(value)).subscribe(
      s => {
        this.loadSessions();
        return true;
      },
      error => {
        console.log(error);
      }
    );
  }

  mapSession(value: any) {
    if(!isNumeric(value.Year_ID)){
      value.Year_ID = this.selectedSession.Year_ID;
    }
    let body = {
      Session_ID: this.selectedSession.Session_ID,
      Session_Name: value.Session_Name,
      Year_ID: value.Year_ID
    };
    return body;
  }

/*
  @ViewChild('updateSession')
  modal: ModalComponent;
//  items: string[] = ['item1', 'item2', 'item3'];
//  selected: string;
//  output: string;

  index: number = 0;
  backdropOptions = [true, false, 'static'];
  cssClass: string = '';

  animation: boolean = true;
  keyboard: boolean = true;
  backdrop: string | boolean = true;
  css: boolean = false;

  closed() {
    this.output = '(closed) ' + this.selected;
  }

  dismissed() {
    this.output = '(dismissed)';
  }

  opened() {
    this.output = '(opened)';
  }

  open() {
    this.modal.open();
    this.loadSchoolYears();
  }
*/
  gotoSession(): void {
    this.router.navigate(['/session', this.selectedSession.Session_ID]);
  }
/*
  addSession(name, year_id) {
    let session = {description: name,
                      year_id: year_id};
    this.sessionService.addSession(session).subscribe(
      schoolyear => {this.loadSessions();
                       return true;
        },
          error => {
            console.error("Error saving year!");
            return Observable.throw(error);
          });
  }
*/

  ngOnInit() {
  	this.loadSessions();
  	this.loadSchoolYears();
  }

}
