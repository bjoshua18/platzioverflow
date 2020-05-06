import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SigninScreenComponent } from './auth/signin/signin-screen.component';
import { SignupScreenComponent } from './auth/signup/signup-screen.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'questions',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: SigninScreenComponent
  },
  {
    path: 'signup',
    component: SignupScreenComponent
  },
  {
    path: 'questions',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
