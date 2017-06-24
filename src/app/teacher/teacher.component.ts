import { Component, OnInit, Inject } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Teacher } from '../models/teacher';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  private selectedTeacher: Teacher;

  teachers: Teacher[];

  constructor(
    @Inject('teacherService') private teacherService,
  ) { }

  loadTeachers() {
    this.teacherService.getTeachers()
      .subscribe(
        s => this.teachers = s,
        err => {
          console.log(err);
        });
  }

  onSelect(teacher: Teacher) {
    this.selectedTeacher = teacher;
  }

  checkUndefined(value) {
    if(typeof value.Teacher_Phone1_Type === 'undefined') {
      value.Teacher_Phone1_Type = this.selectedTeacher.Teacher_Phone1_Type;
    }
    if(typeof value.Teacher_Phone2_Type === 'undefined') {
      value.Teacher_Phone2_Type = this.selectedTeacher.Teacher_Phone2_Type;
    }
    if(typeof value.Protecting_Gods_Children_Check === 'undefined') {
      value.Protecting_Gods_Children_Check = this.selectedTeacher.Protecting_Gods_Children_Check;
    }
    if(typeof value.Is_A_Parent === 'undefined') {
      value.Is_A_Parent = this.selectedTeacher.Is_A_Parent;
    }
    if(typeof value.Teacher_Active === 'undefined') {
      value.Teacher_Active = this.selectedTeacher.Teacher_Active;
    }
    value.Teacher_ID = this.selectedTeacher.Teacher_ID;
    return value;
}

  addTeacher(value: any) {
    value.Is_A_Parent = this.setCheckboxFalse(value.Is_A_Parent);
    value.Protecting_Gods_Children_Check = this.setCheckboxFalse(value.Protecting_Gods_Children_Check);
    this.teacherService.addTeacher(value).subscribe(
      value => {
        this.loadTeachers();
        return true;
      },
      error => {
        console.error("Error saving year!");
        return Observable.throw(error);
      });
  }

  setCheckboxFalse(val) {
    if(!val) {
      val = false;
    }
    return val;
  }

  updateTeacher(value: any) {
    this.teacherService.updateTeacher(this.checkUndefined(value)).subscribe(
      v => {
        this.loadTeachers();
        return true;
      },
      error => {
        console.log(error);
    }
    )
  }

  ngOnInit() {
    this.loadTeachers();
  }

}
