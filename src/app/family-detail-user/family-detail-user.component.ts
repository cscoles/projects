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

import { Router } from '@angular/router';
import { Classroom } from '../models/classroom';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-family-detail-user',
  templateUrl: './family-detail-user.component.html',
  styleUrls: ['./family-detail-user.component.css']
})
export class FamilyDetailUserComponent implements OnInit, OnDestroy {

  sessions: Session[];
  classrooms: Classroom[];
  newStudentID: any;

  studentRec: Student;
  birthDate: any;
  baptismDate: any;
  eucharistDate: any;
  confirmationDate: any;
  teacherName: string;
  newStudent: any;
  years: SchoolYear[];

  date: DateModel;
  options: DatePickerOptions;

  id: number;
  showTab: string;
  family: Family;
  parents: Parent[];
  selectedParent: Parent;
  students: StudentReg[];
  selectedStudent: StudentReg;
  paymentId: any;
  planYear: SchoolYear;
  pSessions: Session;
  payments: any;
  familyTotals: any;
  chargeTotal: any;
  paymentTotal: any;
  balanceTotal: any;
  regStudents: any;
  famStudents: any;
  familyId: number;
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
    @Inject('classroomService') private classroomService,
    @Inject('paymentService') private paymentService,
    private route: ActivatedRoute
  ) { }

  loadFamily(id) {
    this.familyService.getFamily(id).subscribe(
      f => {
        this.family = f;
        setTimeout(() => {
          this.familyId = this.family.Family_ID;
          console.log(this.family);

        }, 100);
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
      v => {
        this.students = v;
        setTimeout(() => console.log(this.students), 100);
      }
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
        setTimeout(() => console.log(this.regStudents), 100);
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
/*
  loadStudents() {
    this.studentService.getStudents()
      .subscribe(
        students => {
          this.students = students[0];
          console.log(this.students);
        },
        err => {
          console.log(err);
        });
  }
*/
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
    let mappedStudent = {
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
      Confirmation_Received: this.setCheckboxFalse(value.Confirmation_Received),
      Confirmation_Date: this.formatToDate(value.Confirmation_Date),
      Confirmation_Church: value.Confirmation_Church,
      Education_Assistance: this.setCheckboxFalse(value.Education_Assistance),
      Education_Assistance_Note: value.Education_Assistance_Note,
      Allergy_Check: this.setCheckboxFalse(value.Allergy_Check),
      Allergy_Note: value.Allergy_Note,
      Student_Active: this.selectedStudent.Student_Active,
      Family_ID: this.selectedStudent.Family_ID,
      Student_ID: this.selectedStudent.Student_ID,
      Year_ID: this.selectedStudent.Year_ID,
      Preferred_Session_ID: this.selectedStudent.Preferred_Session_ID,
      Student_Grade_Entering: this.selectedStudent.Student_Grade_Entering,
      Student_Registration_ID: this.selectedStudent.Student_Registration_ID,
      Class_ID: this.selectedStudent.Class_ID
    }

    return mappedStudent;
  }

  createRegistration(value) {
    this.studentService.addRegistration(this.mapReg(value)).subscribe(
      s => {
        this.loadStudents(this.id);
        this.loadAllActiveStudentsForFam();
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
        this.loadStudents(this.id);
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
    this.loadSessions(this.selectedStudent.Year_ID);
    this.loadClassrooms(this.selectedStudent.Session_ID, this.selectedStudent.Student_Grade_Entering);
    this.birthDate = this.formatFromDate(this.selectedStudent.Student_Birth_Date);
    this.baptismDate = this.formatFromDate(this.selectedStudent.Baptism_Date);
    this.eucharistDate = this.formatFromDate(this.selectedStudent.Eucharist_Date);
    this.confirmationDate = this.formatFromDate(this.selectedStudent.Confirmation_Date);
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
    let mappedFamily = this.mapFamily(value);
    console.log(mappedFamily);
    this.familyService.updateFamily(mappedFamily).subscribe(
      () => {
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
      Medical_Consent: this.setCheckboxFalse(value.Medical_Consent),
      Registered_Parishioner: this.setCheckboxFalse(value.Registered_Parishioner),
      Children_Lives_With: value.Children_Lives_With,
      Family_No_Release: value.Family_No_Release,
      Media_Permission: value.Media_Permission,
      Witness_Agreement: true,
      Safe_Touch_Agreement: this.setCheckboxFalse(value.Safe_Touch_Agreement),
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

  loadFamilyPaymentTotal(id) {
    this.paymentService.getFamilyPaymentTotals(id).subscribe(
      v => {
        this.familyTotals = v[0];
        setTimeout (() => this.processTotals(this.familyTotals), 100);
      }
    )
  }

  processTotals(totals) {

    if(totals.TotalCharges == null) {
      this.chargeTotal = 0;
    } else {
      this.chargeTotal = totals.TotalCharges;
    }
    if(totals.TotalPayments == null) {
      this.paymentTotal = 0;
    } else {
      this.paymentTotal = totals.TotalPayments;
    }
    this.balanceTotal = this.chargeTotal - this.paymentTotal;
  }

  loadFamilyPayments(id) {
    this.paymentService.getFamilyPayments(id).subscribe(
      v => this.payments = v
    )
  }

  /*
  openTab(evt, tabName) {
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

  }
*/
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loadFamily(this.id);
      this.loadParents(this.id);
      this.loadStudents(this.id);
      this.loadPlanningYear();
      this.loadFamilyPaymentTotal(this.id);
      this.loadFamilyPayments(this.id);
      this.birthDate = this.formatFromDate('0000-00-00');
      this.baptismDate = this.formatFromDate('0000-00-00');
      this.eucharistDate = this.formatFromDate('0000-00-00');
      this.confirmationDate = this.formatFromDate('0000-00-00');
      this.loadYears();
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
