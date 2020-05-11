import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../core/models/question.model';
import { QuestionService } from 'src/app/question/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.sass'],
  providers: [QuestionService]
})
export class QuestionListComponent implements OnInit {

  @Input() sort = '-createdAt';
  questions: Question[];
  loading = true;

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.questionService.getQuestions(this.sort)
      .then((questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      });
  }
}
