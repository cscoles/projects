import { Component, OnInit, Inject } from '@angular/core';
import { StudentReg } from '../models/student-reg';
import { SchoolYear } from "../models/school-year";
import { Session } from '../models/session';
import { Router } from '@angular/router';
import {Classroom} from "../models/classroom";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  students: StudentReg[];
  year: SchoolYear;
  sessions: Session[];
  classrooms: Classroom;


  constructor(
    @Inject('studentService') private studentService,
    @Inject('sessionService') private sessionService,
    @Inject('classroomService') private classroomService,
    @Inject('schoolYearService') private schoolYearService,
    private router: Router
  ) { }

  loadPlanningYear(){
    this.schoolYearService.getPlanSchoolYear().subscribe(
      v => {
        this.year = v[0];
        this.loadSessions();
      }
    )
  }

  loadStudents() {
    this.studentService.getStudentReg()
      .subscribe(
        students => {
          this.students = students[0];
        },
        err => {
          console.log(err);
        });
  }

  loadSessions() {
    this.sessionService.getSessionsByYear(this.year.Year_ID)
      .subscribe(
        s => {
          this.sessions = s;
        },
        err => {
          console.log(err);
        });
  }

  loadClassrooms(sessionID, grade) {
    let id = sessionID;
    if(id == null || !id){
    }else if (typeof id === 'string') {
      id = id.slice(2,4);
    }
    this.classroomService.getClassroomsBySessionGrade(id, grade)
      .subscribe(
        c => {
          this.classrooms = c;
        },
        err => {
          console.log(err);
        }
      );
    id = null;

  }

  updateRegistration(s: any, session, c) {

    let value = this.mapReg(s[0], session, c);
    this.studentService.updateRegistration(value).subscribe(
      v => {
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  mapReg(s, session, c) {
    let newReg = {
      Year_ID: s.Year_ID,
      Session_ID: session.slice(2,5).trim(),
      Student_ID: s.Student_ID,
      Preferred_Session_ID: s.Preferred_Session_ID,
      Student_Grade_Entering: s.Student_Grade_Entering,
      Class_ID: c.slice(2,5).trim(),
      Student_Registration_ID: s.Student_Registration_ID
    }
    return newReg;
  }

  ngOnInit() {
    this.loadStudents();
    this.loadPlanningYear();
  }

}
