import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import 'hammerjs';

// Modules
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { SignupScreenComponent } from './auth/signup/signup-screen.component';
import { QuestionModule } from './question/question.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninScreenComponent,
    SignupScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
