import { Component } from '@angular/core';
import { Question } from '../question.model';

const q = new Question(
  '¿Cómo reutilizo un componente en Android?',
  'Miren, esta es mi pregunta...',
  new Date(),
  'none'
);

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.sass']
})
export class QuestionListComponent {
  questions: Question[] = new Array(10).fill(q);
}
