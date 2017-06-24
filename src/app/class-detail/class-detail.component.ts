import {Component, OnInit, Inject, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Classroom} from '../models/classroom';
import {Session} from '../models/session';
import {Student} from '../models/student';
import {SchoolYear} from '../models/school-year';
import {Teacher} from '../models/teacher';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.css']
})
export class ClassDetailComponent implements OnInit {

  selectedStudent: any;
  classroom: Classroom;
  sessions: Session[];
  schoolyears: SchoolYear[];
  teachers: Teacher[];
  students: any;
  sub: any;
  id: any;
  // studentCount: any;

  constructor(
    @Inject('classroomService') private classroomService,
    @Inject('sessionService') private sessionService,
    @Inject('studentService') private studentService,
    @Inject('schoolYearService') private schoolYearService,
    @Inject('teacherService') private teacherService,
    private route: ActivatedRoute
  ) { }

  loadActivePlanSchoolYears() {
    this.schoolYearService.getActivePlanSchoolYears()
      .subscribe(
        s => this.schoolyears = s,
        err => {
          console.log(err);
        });
  }

  loadActiveSession() {
    this.sessionService.getActiveSession()
      .subscribe(
        s => this.sessions = s,
        err => {
          console.log(err);
        });
  }

  updateClassroom(value: any) {
    console.log(value);
    console.log(this.mapClassroom(value));
    this.classroomService.updateClassroom(this.mapClassroom(value)).subscribe(
      v => {
        // this.loadClasses();
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  mapClassroom(value: any) {
    let sessionId = this.classroom.Session_ID;
    let classGrade = this.classroom.Class_Grade;
    if(value.Session_ID) {
      sessionId = value.Session_ID;
    }
    if(value.Class_Grade) {
      classGrade = value.Class_Grade;
    }

    let val = {
      Teacher_ID: value.Teacher_ID,
      Class_Grade: classGrade,
      Session_ID: sessionId,
      Class_ID: this.classroom.Class_ID
    };
    return val;
  }

  onSelect(student: any){
    this.selectedStudent = student;
  }

  loadActiveTeachers() {
    this.teacherService.getActiveTeachers()
      .subscribe(
        s => this.teachers = s,
        err => {
          console.log(err);
        });
  }

  loadClass(id) {
    this.classroomService.getClassroom(id).subscribe(
      v => this.classroom = v
    )
  }

  loadStudents(id) {
    this.classroomService.getClassroomStudents(id).subscribe(
      v => {
        this.students = v;
      }
    )
  }

  removeStudent(student) {
    let studentReg = {
      Student_Registration_ID: student.Student_Registration_ID,
      Session_ID: student.Session_ID,
      Year_ID: student.Year_ID,
      Student_ID: student.Student_ID,
      Preferred_Session_ID: student.Preferred_Session_ID,
      Student_Grade_Entering: student.Student_Grade_Entering,
      Class_ID: null
    };
    this.studentService.updateRegistration(studentReg).subscribe(
      v => {
        this.loadStudents(this.id);
        // this.getClassroomCount(this.id);
      }
    )
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      },
    err => console.log(err));
    // this.loadClasses();
    this.loadActiveSession();
    this.loadActiveTeachers();
    this.loadClass(this.id);
    this.loadStudents(this.id);
    // this.getClassroomCount(this.id);
  }

}
