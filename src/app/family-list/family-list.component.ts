import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PhonePipe } from '../key-value.pipe';

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {

  families: any;
  selectedFamily: any;
  schoolyears: any;
  yearID: string;
  mappedFamilies: any;
  tempFamilies: any;
  family: any;

  constructor(
    @Inject('familyService') private familyService,
    @Inject('schoolYearService') private schoolYearService,
    @Inject('parentService') private parentService,
    @Inject('authService') private authService,
    private router: Router
  ) { }

  loadFamilies() {
    this.familyService.getFamilies().subscribe(
      f => {
        this.families = f;
      }
    )
  }

  onSelect(fam) {
    this.family = fam;
    this.gotoFamily();
  }

  loadFamiliesByPaymentYear(id) {
    this.familyService.getFamiliesByPaymentYear(id).subscribe(
      f => this.families = f
    )
  }

  loadDecision(v) {
    if(v == 'all') {
      this.loadFamilies();
    } else {
      this.yearID = v.slice(3,7);
      this.loadFamiliesByPaymentYear(this.yearID);
    }
  }

  loadSchoolYears() {
    this.schoolYearService.getSchoolYears()
      .subscribe(
        schoolyears => this.schoolyears = schoolyears,
        err => {
          console.log(err);
        });
  }

  gotoFamily(): void {
    this.router.navigate(['/family', this.family.Family_ID]);
  }

  ngOnInit() {
    this.loadFamilies();
    this.loadSchoolYears();
  }

}
