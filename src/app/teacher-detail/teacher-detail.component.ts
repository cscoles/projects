import { Component, OnInit, Inject, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Teacher} from '../models/teacher';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit {

  @Input() selectedTeacher: Teacher;

  constructor(
    @Inject('teacherService') private teacherService
  ) { }

  addTeacher(value: any) {
    value.Is_A_Parent = this.setCheckboxFalse(value.Is_A_Parent);
    value.protecting_gods_children_check = this.setCheckboxFalse(value.protecting_gods_children_check);
    this.teacherService.addTeacher(value).subscribe(
      value => {
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

  ngOnInit() {
  }

}
