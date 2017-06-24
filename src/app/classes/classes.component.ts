import {Component, OnInit, Inject, Input} from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Classroom} from '../models/classroom';
import {Session} from '../models/session';
import {SchoolYear} from '../models/school-year';
import {Teacher} from '../models/teacher';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  @Input() selectedClassroom: Classroom;

  classrooms: Classroom[];
  sessions: Session[];
  schoolyears: SchoolYear[];
  teachers: Teacher[];

  constructor(
    @Inject('classroomService') private classroomService,
    @Inject('sessionService') private sessionService,
    @Inject('schoolYearService') private schoolYearService,
    @Inject('teacherService') private teacherService,
    private router: Router
  ) { }

  loadClasses() {
    this.classroomService.getClassrooms()
      .subscribe(
        classroom => this.classrooms = classroom,
        err => {
          console.log(err);
        });

  }

  addClassroom(value: any) {
    this.classroomService.addClassroom(value).subscribe(
      classroom => {
        this.loadClasses();
        return true;
      },
      error => {
        console.error("Error saving year!");
        return Observable.throw(error);
      });
  }

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
    this.classroomService.updateClassroom(this.mapClassroom(value)).subscribe(
      v => {
        this.loadClasses();
        return true;
      },
      err => {
        console.log(err);
      }
    )
  }

  mapClassroom(value: any) {
    let val = {
      Teacher_ID: value.Teacher_ID,
      Class_Grade: value.Class_Grade,
      Session_ID: value.Session_ID,
      Class_ID: this.selectedClassroom.Class_ID
    };
    return val;
  }

  onSelect(classroom: any){
    this.selectedClassroom = classroom;
    this.gotoClassDetail();
  }

  gotoClassDetail() {
    this.router.navigate(['/class', this.selectedClassroom.Class_ID]);
  }

  loadActiveTeachers() {
    this.teacherService.getActiveTeachers()
      .subscribe(
        s => this.teachers = s,
        err => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.loadClasses();
    this.loadActiveSession();
    this.loadActiveTeachers();
  }

}
