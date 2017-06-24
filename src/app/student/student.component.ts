import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentReg } from '../models/student-reg';
import { Student } from '../models/student';
import { Session } from '../models/session';
import { Classroom } from '../models/classroom';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import {SchoolYear} from "../models/school-year";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Input() selectedStudent: StudentReg;
  @Input() familyId: number;
  students: StudentReg[];
  sessions: Session[];
  classrooms: Classroom[];
  newStudentID: any;

  studentRec: Student;
  birthDate: any;
  baptismDate: any;
  eucharistDate: any;
  confirmationDate: any;
  teacherName: string;
  noteId: any;
  newStudent: any;
  years: SchoolYear[];

  date: DateModel;
  options: DatePickerOptions;

  constructor(
    @Inject('studentService') private studentService,
    @Inject('sessionService') private sessionService,
    @Inject('classroomService') private classroomService,
    @Inject('schoolYearService') private schoolYearService,
    private router: Router
  ) { }

  getNotes() {
    this.noteId = {
      valueType: 'Student_ID',
      value: this.selectedStudent.Student_ID
    }
  }

  loadStudents() {
    this.studentService.getStudents()
      .subscribe(
        students => {
          this.students = students[0];
        },
        err => {
          console.log(err);
        });
  }

  loadYears() {
    this.schoolYearService.getActivePlanSchoolYears()
      .subscribe(
        year => {
          this.years = year;
        },
        err => {
          console.log(err);
        });
  }

  loadSessions(id) {
    let yid = id;
    if(yid == null || !yid){
    }else if (typeof yid === 'string') {
      yid = yid.slice(2,4);
    }
    this.sessionService.getSessionsByYear(yid)
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

  updateStudent(value) {
    let v = this.mapData(value);
    this.studentService.updateStudent(v).subscribe(
      s => {
        this.updateRegistration(v);
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  createStudent(value) {
    let v = this.mapNew(value);
    this.studentService.addStudent(v).subscribe(
      s => {
        this.newStudentID = s[0];
        this.createRegistration(value);
        this.gotoFamily();
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  mapNew(value) {

    this.newStudent = {
      Student_Last_Name: value.Student_Last_Name,
      Student_First_Name: value.Student_First_Name,
      Student_Middle_Name: value.Student_Middle_Name,
      Student_Gender: value.Student_Gender,
      Student_Birth_Date: this.formatToDate(value.Student_Birth_Date),
      Baptism_Check: this.setCheckboxFalse(value.Baptism_Check),
      Baptism_Date: this.formatToDate(value.Baptism_Date),
      Baptism_Church: value.Baptism_Church,
      Eucharist_Received: this.setCheckboxFalse(value.Eucharist_Received),
      Eucharist_Date: this.formatToDate(value.Eucharist_Date),
      Eucharist_Church: value.Eucharist_Church,
      Confirmation_Received: false,
      Confirmation_Date: '0000-00-00',
      Confirmation_Church: '',
      Education_Assistance: this.setCheckboxFalse(value.Education_Assistance),
      Education_Assistance_Note: value.Education_Assistance_Note,
      Allergy_Check: this.setCheckboxFalse(value.Allergy_Check),
      Allergy_Note: value.Allergy_Note,
      Family_ID: this.familyId
    }

    return this.newStudent;
  }

  mapReg(value) {
    let newReg = {
      Year_ID: value.Year_ID,
      Student_ID: this.newStudentID.Student_ID,
      Preferred_Session_ID: value.Preferred_Session_ID,
      Student_Grade_Entering: value.Student_Grade_Entering
    }

    return newReg;
  }

  mapData(value) {
    if(typeof value.Student_Gender === 'undefined') {
      value.Student_Gender = this.selectedStudent.Student_Gender;
    }
    value.Student_Birth_Date = this.formatToDate(value.Student_Birth_Date);
    value.Baptism_Date = this.formatToDate(value.Baptism_Date);
    value.Eucharist_Date = this.formatToDate(value.Eucharist_Date);
    value.Confirmation_Date = this.formatToDate(value.Confirmation_Date);
    value.Student_ID = this.selectedStudent.Student_ID;
    value.Family_ID = this.selectedStudent.Family_ID;
    value.Student_Registration_ID = this.selectedStudent.Student_Registration_ID;
    value.Year_ID = this.selectedStudent.Year_ID;
    value.Preferred_Session_ID = this.selectedStudent.Preferred_Session_ID;
    value.Student_Grade_Entering = this.selectedStudent.Student_Grade_Entering;
    return value;
  }

  createRegistration(value) {
    this.studentService.addRegistration(this.mapReg(value)).subscribe(
      s => {
        this.loadStudents();
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRegistration(value) {
    this.studentService.updateRegistration(value).subscribe(
      s => {
        this.loadStudents();
        return true;
      },
      err => {
        console.log(err);
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

  gotoFamily(): void {
    this.router.navigate(['/family', this.familyId]);
  }

  ngOnInit() {
    this.birthDate = this.formatFromDate('0000-00-00');
    this.baptismDate = this.formatFromDate('0000-00-00');
    this.eucharistDate = this.formatFromDate('0000-00-00');
    this.confirmationDate = this.formatFromDate('0000-00-00');
    this.loadYears();
    if(this.selectedStudent) {
      this.loadSessions(this.selectedStudent.Year_ID);
      this.loadClassrooms(this.selectedStudent.Session_ID, this.selectedStudent.Student_Grade_Entering);
      this.birthDate = this.formatFromDate(this.selectedStudent.Student_Birth_Date);
      this.baptismDate = this.formatFromDate(this.selectedStudent.Baptism_Date);
      this.eucharistDate = this.formatFromDate(this.selectedStudent.Eucharist_Date);
      this.confirmationDate = this.formatFromDate(this.selectedStudent.Confirmation_Date);
    }
  }

}
