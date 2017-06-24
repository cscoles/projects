import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FamilyComponent } from '../family/family.component';
import { FamilyListComponent } from '../family-list/family-list.component';
import { StudentListComponent } from '../student-list/student-list.component';
import { StudentComponent } from '../student/student.component';
import { ClassesComponent } from '../classes/classes.component';
import { ClassDetailComponent } from '../class-detail/class-detail.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { ParentComponent } from '../parent/parent.component';
import { PaymentComponent } from '../payment/payment.component';
import { AdminComponent } from '../admin/admin.component';
import { SessionDetailComponent } from '../session-detail/session-detail.component'
import { YearListComponent } from '../year-list/year-list.component';
import {FamilyDetailComponent} from "../family-detail/family-detail.component";
import {FamilyDetailUserComponent} from "../family-detail-user/family-detail-user.component";
import { RegistrationComponent } from '../registration/registration.component';
import { NewRegistrationComponent } from '../new-registration/new-registration.component';
import { AuthComponent } from '../auth/auth.component';

const routes: Routes = [

	{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
	{path: 'family', component: FamilyComponent},
  {path: 'families', component: FamilyListComponent},
  {path: 'student', component: StudentListComponent},
  {path: 'class', component: ClassesComponent},
  {path: 'class/:id', component: ClassDetailComponent},
  {path: 'teacher', component: TeacherComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'family/:id', component: FamilyDetailComponent},
  {path: 'family-usr/:id', component: FamilyDetailUserComponent},
  {path: 'new-reg', component: NewRegistrationComponent},
  {path: 'family/:fid/parent/:pid', component: ParentComponent},
  {path: 'family/:fid/student/:sid', component: StudentComponent},
  {path: 'family/:fid/payment', component: PaymentComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
