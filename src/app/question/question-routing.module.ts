import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionFormComponent } from './question-form/question-form.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionListComponent
  },
  {
    path: 'new',
    component: QuestionFormComponent
  },
  {
    path: ':id',
    component: QuestionDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
