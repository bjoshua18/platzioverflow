import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { QuestionScreenComponent } from './question-screen/question-screen.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionFormComponent } from './question-form/question-form.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionScreenComponent
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
