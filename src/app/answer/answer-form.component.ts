import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { Question } from '../question/question.model';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.sass']
})
export class AnswerFormComponent {
  // El componente recibe este dato del componente padre
  @Input() question: Question;

  onSubmit(form: NgForm) {
    // Creamos la respuesta
    const answer = new Answer(
      form.value.description,
      this.question,
      new Date(),
      new User(null, null, 'Paula', 'Becerra')
    );
    // La agregamos al principio de la lista de respuesta
    this.question.answers.unshift(answer);
    // Reseteo del form
    form.reset();
  }
}
