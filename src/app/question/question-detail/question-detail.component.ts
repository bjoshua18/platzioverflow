import { Component, OnInit, OnDestroy } from '@angular/core';
import { Question } from '../../core/models/question.model';
import { QuestionService } from 'src/app/question/question.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.sass'],
  providers: [QuestionService]
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  question?: Question;
  loading = true;
  sub: any;

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(
        params => this.questionService
          .getQuestion(params.id)
          .then((question: Question) => {
            this.question = question;
            this.loading = false;
          })
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
