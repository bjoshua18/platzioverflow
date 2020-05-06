import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionRoutingModule } from './question-routing.module';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { MomentModule } from 'ngx-moment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerFormComponent } from '../answer/answer-form.component';
// Angular Material
import { MaterialModule } from '../material/material.module';
import 'hammerjs';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    QuestionListComponent,
    QuestionFormComponent,
    AnswerFormComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionModule {}
