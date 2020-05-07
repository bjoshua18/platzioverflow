import { Component, OnInit } from '@angular/core';
import { Question } from '../../core/models/question.model';
import { QuestionService } from 'src/app/core/services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.sass'],
  providers: [QuestionService]
})
export class QuestionListComponent implements OnInit {
  questions: Question[];
  loading = true;

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.fetchQuestions();
  }

  fetchQuestions() {
    this.questionService.getQuestions()
      .then((questions: Question[]) => {
        this.questions = questions;
        this.loading = false;
      });
  }
}
