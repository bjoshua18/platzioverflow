import { Component } from '@angular/core';
import { Question } from '../../core/models/question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.sass']
})
export class QuestionDetailComponent {
  question: Question = new Question(
    'Esta es una nueva pregunta sobre Android',
    'Miren, tengo una duda con una aplicacion que estoy escribiendo para Android...',
    new Date(),
    'devicon-android-plain'
  );
}
