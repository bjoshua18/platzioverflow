import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from '../core/models/answer.model';
import { Question } from '../core/models/question.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.sass'],
  providers: [QuestionService]
})
export class AnswerFormComponent {
  // El componente recibe este dato del componente padre
  @Input() question: Question;

  sweetScroll: SweetScroll;

  constructor(
    private questionService: QuestionService,
    private authService: AuthService,
    private router: Router
  ) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
    // Creamos la respuesta
    const answer = new Answer(
      form.value.description,
      this.question
    );
    // Enviamos 'answer' al backend
    this.questionService
      .addAnswer(answer)
      .subscribe(
        (a: Answer) => {
          this.question.answers.unshift(a);
          this.sweetScroll.to('#title');
        },
        this.authService.handleError
      );
    // Reseteo del form
    form.reset();
  }
}
