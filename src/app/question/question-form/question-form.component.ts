import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../../core/models/question.model';
import icons from '../icons';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass']
})
export class QuestionFormComponent {

  icons = icons;

  getIconVersion(icon: any) {
    return icon.versions.font.includes('plain-wordmark') ? 'plain-wordmark' : icon.versions.font[0];
  }

  onSubmit(form: NgForm) {
    const q = new Question(
      form.value.title,
      form.value.description,
      new Date(),
      form.value.icon
    );
    console.log(q);
  }

}
