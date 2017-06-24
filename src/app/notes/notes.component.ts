import { Component, OnInit, Input, Inject } from '@angular/core';
import {StudentNote} from "../models/studentNote";
import {FamilyNote} from "../models/familyNote";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() noteOwner: any;
  sNotes: StudentNote[];
  fNotes: FamilyNote[];
  fNote: any;
  sNote: any;

  constructor(
    @Inject('familyService') private familyService,
    @Inject('studentService') private studentService
  ) { }

  loadStudentNotes(id) {
    this.studentService.getNotes(id).subscribe(
      v => this.sNotes = v
    )
  }

  loadFamilyNotes(id) {
    this.familyService.getNotes(id).subscribe(
      v => this.fNotes = v
    )
  }

  addStudentNote(id) {
    this.sNote = {
      Student_ID: this.noteOwner.value,
      Student_Note: id.value
    }
    this.studentService.addStudentNote(this.sNote).subscribe(
      v => {
        this.loadStudentNotes(this.noteOwner.value);
        return true;
      }
    )
  }

  deleteStudentNote(id) {
    this.studentService.deleteStudentNote(id).subscribe(
      v => {
        this.loadStudentNotes(this.noteOwner.value);
        return true;
      }
    )
  }

  addFamilyNote(id) {
    this.fNote = {
      Family_ID: this.noteOwner.value,
      Family_Note: id.value
    }
    this.familyService.addFamilyNote(this.fNote).subscribe(
      v => {
        this.loadFamilyNotes(this.noteOwner.value);
        return true;
      }
    )
  }

  deleteFamilyNote(id) {
    this.familyService.deleteFamilyNote(id).subscribe(
      v => {
        this.loadFamilyNotes(this.noteOwner.value);
        return true;
      }
    )
  }

  ngOnInit() {
    if(this.noteOwner.valueType == 'Student_ID') {
      this.loadStudentNotes(this.noteOwner.value);
    } else {
      this.loadFamilyNotes(this.noteOwner.value);
    }

  }

}
