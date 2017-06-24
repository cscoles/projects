import { Component, OnInit, Inject, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Parent} from '../models/parent';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {


  constructor(
    @Inject('parentService') private parentService
  ) { }


  addParent(value: any) {
  this.parentService.addParent(value).subscribe(
    value => {
      return true;
    },
    error => {
      console.error("Error saving parent!");
      return Observable.throw(error);
    });
}

  ngOnInit() {
  }

}
