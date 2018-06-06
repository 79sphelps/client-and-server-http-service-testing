import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RootComponent } from './root/root.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

import { UserService } from './user.service';

import { ROUTING } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RootComponent,
    UserNewComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpModule
  ],
  providers: [ UserService],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
