import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DatePickerModule } from 'ng2-datepicker';

// Routing imports
import { AppRoutingModule } from './app-routing/app-routing.module';

// Service imports
import { SchoolYearService } from './services/year.service';
import { SessionService } from './services/session.service';
import { TeacherService } from './services/teacher.service';
import { ClassroomService } from './services/classroom.service';
import { FamilyService } from './services/family.service';
import { StudentService } from './services/student.service';
import { ParentService } from './services/parent.service';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { PaymentService } from './services/payment.service';

// Component imports
import { AppComponent } from './app.component';
import { YearListComponent } from './year-list/year-list.component';
import { KeyValuePipe, PhonePipe } from './key-value.pipe';
import { AdminComponent } from './admin/admin.component';
import { FamilyComponent } from './family/family.component';
import { StudentComponent } from './student/student.component';
import { ParentComponent } from './parent/parent.component';
import { ClassesComponent } from './classes/classes.component';
import { TeacherComponent } from './teacher/teacher.component';
import { SessionListComponent } from './session-list/session-list.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { FamilyListComponent } from './family-list/family-list.component';
import { SchoolyearComponent } from './schoolyear/schoolyear.component';
import { StudentListComponent } from './student-list/student-list.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { FamilyDetailUserComponent } from './family-detail-user/family-detail-user.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { PaymentComponent } from './payment/payment.component';
import { NotesComponent } from './notes/notes.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    YearListComponent,
    KeyValuePipe,
    AdminComponent,
    FamilyComponent,
    StudentComponent,
    ParentComponent,
    ClassesComponent,
    TeacherComponent,
    SessionListComponent,
    SessionDetailComponent,
    TeacherDetailComponent,
    PhonePipe,
    ClassDetailComponent,
    FamilyListComponent,
    SchoolyearComponent,
    StudentListComponent,
    FamilyDetailComponent,
    NewRegistrationComponent,
    PaymentComponent,
    NotesComponent,
    RegistrationComponent,
    AuthComponent,
    FamilyDetailUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2Bs3ModalModule,
    DatePickerModule
  ],
  providers: [
    {provide: 'schoolYearService', useClass: SchoolYearService},
    {provide: 'api', useValue: 'http://173.230.155.174:3000/api'},
    {provide: 'sessionService', useClass: SessionService},
    {provide: 'teacherService', useClass: TeacherService},
    {provide: 'classroomService', useClass: ClassroomService},
    {provide: 'familyService', useClass: FamilyService},
    {provide: 'studentService', useClass: StudentService},
    {provide: 'parentService', useClass: ParentService},
    {provide: 'authService', useClass: AuthService},
    {provide: 'messageService', useClass: MessageService},
    {provide: 'paymentService', useClass: PaymentService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
