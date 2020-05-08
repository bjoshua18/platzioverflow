import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Question } from '../../core/models/question.model';
import icons from '../icons';
import { QuestionService } from 'src/app/question/question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.sass'],
  providers: [QuestionService]
})
export class QuestionFormComponent {

  icons = icons;

  constructor(
    private questionService: QuestionService,
    private router: Router
  ) { }

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
    this.questionService.addQuestion(q)
      .subscribe(
        (question: Question) => this.router.navigate(['/questions', question._id]),
        error => console.error(error)
      );
  }

}
