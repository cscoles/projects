import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Family } from '../models/family';
import { Parent } from '../models/parent';
import { SchoolYear } from '../models/school-year';
import { StudentReg } from '../models/student-reg';
import { Student } from '../models/student';
import { Session } from '../models/session';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.css']
})
export class FamilyDetailComponent implements OnInit, OnDestroy {

  id: number;
  showTab: string;
  family: Family;
  parents: Parent[];
  selectedParent: Parent;
  students: StudentReg[];
  selectedStudent: StudentReg;
  noteId: any;
  paymentId: any;
  planYear: SchoolYear;
  pSessions: Session;
  regStudents: any;
  famStudents: any;
  regRec: any;
  private sub: any;
  dummyReg = {
    Student_Grade_Entering: '',
    Preferred_Session_ID: ''
  };
  i: number;

  constructor(
    @Inject('familyService') private familyService,
    @Inject('parentService') private parentService,
    @Inject('studentService') private studentService,
    @Inject('schoolYearService') private schoolYearService,
    @Inject('sessionService') private sessionService,
    private route: ActivatedRoute
  ) { }

  loadFamily(id) {
    this.familyService.getFamily(id).subscribe(
      f => {
        this.family = f;
      }
    )
  }

  loadParents(id) {
    this.parentService.getParentByFamily(id).subscribe(
      v => this.parents = v
    )
  }

  loadStudents(id) {
    this.studentService.getStudentsByFamily(id).subscribe(
      v => this.students = v
    )
  }

  loadPlanningYear() {
    this.schoolYearService.getPlanSchoolYear().subscribe(
      v => {
        this.planYear = v;
        this.loadPlanningSession(this.planYear[0].Year_ID);
        setTimeout(() => this.loadAllActiveStudentsForFam(), 100);
      }
    )
  }

  loadAllActiveStudentsForFam() {
    this.studentService.getAllStudentsByFamily(this.id, this.planYear[0].Year_ID).subscribe(
      v => {
        this.regStudents = v;
      }
    )
  }

  getRegistrationByStudent(id) {
    this.studentService.getRegistrationByStudent(id).subscribe(
      v => {
        this.regRec = v;
        if (this.regRec.Student_ID) {
          this.regStudents.push(this.mapRegStudent(this.famStudents[this.i], this.regRec, true));
        } else {
          this.regStudents.push(this.mapRegStudent(this.famStudents[this.i], this.dummyReg, false));
        }
      }
    )
  }

  matchStudentToReg() {
    if(this.planYear) {
      for(this.i = 0; this.i < this.famStudents.length; this.i++){
        this.getRegistrationByStudent(this.famStudents[this.i].Student_ID);
      }
    }
  }

  loadPlanningSession(id) {
    this.sessionService.getSessionsByYear(id).subscribe(
      v => {
        this.pSessions = v;
      }
    )
  }

  getNotes() {
    this.noteId = {
      valueType: 'Family_ID',
      value: this.family.Family_ID
    }
  }

  getPayments() {
    this.paymentId = {
      valueType: 'Family_ID',
      value: this.family.Family_ID
    }
  }

  onSelectParent(v) {
    this.selectedParent = v;
  }

  onSelectStudent(v) {
    this.selectedStudent = v;
  }

  mapRegStudent(x, y, z) {
    let v = {
      Student_Last_Name: x.Student_Last_Name,
      Student_First_Name: x.Student_First_Name,
      Student_Grade_Entering: y.Student_Grade_Entering,
      Preferred_Session_ID: y.Preferred_Session_ID,
      Year_ID: this.planYear[0].Year_ID,
      Registered: z
    }
    return v;
  }

  addRegistration(id, grade, sessionId) {
    let body = {
      Student_ID: id,
      Student_Grade_Entering: grade,
      Preferred_Session_ID: sessionId.slice(3,6),
      Year_ID: this.planYear[0].Year_ID
    };

    this.studentService.addRegistration(body).subscribe(
      v => {
        this.loadAllActiveStudentsForFam();
        return true;
      }
    )
  }

  addParent(value: any) {
    this.parentService.addParent(this.mapNewParent(value)).subscribe(
      value => {
        this.loadParents(this.id);
        return true;
      },
      error => {
        console.error("Error saving parent!");
        return Observable.throw(error);
      });
  }

  updateParent(value: any) {
    this.parentService.updateParent(this.mapParent(value)).subscribe(
      value => {
        this.loadParents(this.id);
        return true;
      },
      error => {
        console.error("Error saving parent!");
        return Observable.throw(error);
      });
  }

  updateFamily(value: any) {
    this.familyService.updateFamily(this.mapFamily(value)).subscribe(
      value => {
        this.loadParents(this.id);
        return true;
      },
      error => {
        console.error("Error saving parent!");
        return Observable.throw(error);
      });
  }

  mapFamily(value) {
    let famObj = {
      Family_ID: this.id,
      Emergency_Last_Name: value.Emergency_Last_Name,
      Emergency_First_Name: value.Emergency_First_Name,
      Emergency_Phone1: value.Emergency_Phone1,
      Emergency_Phone_Type1: value.Emergency_Phone_Type1,
      Emergency_Phone2: value.Emergency_Phone_Type2,
      Physician_Last_Name: value.Physician_Last_Name,
      Physician_First_Name: value.Physician_First_Name,
      Physician_Phone: value.Physician_Phone,
      Medical_Consent: value.Medical_Consent,
      Registered_Parishioner: value.Registered_Parishioner,
      Children_Lives_With: value.Children_Lives_With,
      Family_No_Release: value.Family_No_Release,
      Media_Permission: value.Media_Permission,
      Witness_Agreement: this.family.Witness_Agreement,
      Safe_Touch_Agreement: this.family.Safe_Touch_Agreement,
      Family_Active: this.family.Family_Active
    }

    return famObj;
  }

  mapParent(value) {
    let parentObj = {
      Parent_Last_Name: value.Parent_Last_Name,
      Parent_First_Name: value.Parent_First_Name,
      Student_Relationship: value.Student_Relationship,
      Parent_Address_1: value.Parent_Address_1,
      Parent_Address_2: value.Parent_Address_2,
      Parent_City: value.Parent_City,
      Parent_State: value.Parent_State,
      Parent_Zip: value.Parent_Zip,
      Parent_Phone1: value.Parent_Phone1,
      Parent_Phone1_Type: value.Parent_Phone1_Type,
      Parent_Phone2: value.Parent_Phone2,
      Parent_Phone2_Type: value.Parent_Phone2_Type,
      Parent_Email: value.Parent_Email,
      Parent_Active: this.selectedParent.Parent_Active,
      Family_ID: this.selectedParent.Family_ID,
      Parent_ID: this.selectedParent.Parent_ID
    }
    return parentObj;
  }

  mapNewParent(value) {
    let parentObj = {
      Parent_Last_Name: value.Parent_Last_Name,
      Parent_First_Name: value.Parent_First_Name,
      Student_Relationship: value.Student_Relationship,
      Parent_Address_1: value.Parent_Address_1,
      Parent_Address_2: value.Parent_Address_2,
      Parent_City: value.Parent_City,
      Parent_State: value.Parent_State,
      Parent_Zip: value.Parent_Zip,
      Parent_Phone1: value.Parent_Phone1,
      Parent_Phone1_Type: value.Parent_Phone1_Type,
      Parent_Phone2: value.Parent_Phone2,
      Parent_Phone2_Type: value.Parent_Phone2_Type,
      Parent_Email: value.Parent_Email,
      Family_ID: this.id
    }
    return parentObj;
  }

/*  openTab(evt, tabName) {
//    this.showTab = tabName;
//    console.log(this.showTab);


    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

  } */

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadFamily(this.id);
      this.loadParents(this.id);
      this.loadStudents(this.id);
      this.loadPlanningYear();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
