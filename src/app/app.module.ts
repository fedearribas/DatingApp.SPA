import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MessagesResolver } from './_resolvers/message.resolver';
import { ListsResolver } from './_resolvers/list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { AuthModule } from './auth/auth.module';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    MemberListComponent,
    MessagesComponent,
    ListsComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    PreventUnsavedChanges,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    MessagesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
