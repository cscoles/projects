import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentReg } from '../models/student-reg';
import { Student } from '../models/student';
import { Session } from '../models/session';
import { Classroom } from '../models/classroom';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: StudentReg[];
  sessions: Session[];
  classrooms: Classroom[];
  selectedStudent: StudentReg;

  studentRec: Student;
  birthDate: any;
  baptismDate: any;
  eucharistDate: any;
  confirmationDate: any;
  teacherName: string;

  date: DateModel;
  options: DatePickerOptions;

  constructor(
    @Inject('studentService') private studentService,
    @Inject('sessionService') private sessionService,
    @Inject('classroomService') private classroomService,
    private router: Router
  ) { }

  loadStudents() {
    this.studentService.getStudents()
      .subscribe(
        students => {
          this.students = students[0];
          setTimeout(() => console.log(this.students), 100)
          },
        err => {
          console.log(err);
        });
  }

  loadSessions(id) {
    this.sessionService.getSessionsByYear(id)
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

  onSelect(student: StudentReg): void {
    this.selectedStudent = student;
    this.loadSessions(this.selectedStudent.Year_ID);
    this.loadClassrooms(this.selectedStudent.Session_ID, this.selectedStudent.Student_Grade_Entering);
    this.birthDate = this.formatFromDate(this.selectedStudent.Student_Birth_Date);
    this.baptismDate = this.formatFromDate(this.selectedStudent.Baptism_Date);
    this.eucharistDate = this.formatFromDate(this.selectedStudent.Eucharist_Date);
    this.confirmationDate = this.formatFromDate(this.selectedStudent.Confirmation_Date);
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
    this.router.navigate(['/family', this.selectedStudent.Family_ID]);
  }

  ngOnInit() {
    this.loadStudents();
  }

}
