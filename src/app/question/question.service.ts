import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Question } from '../core/models/question.model';
import { environment } from 'src/environments/environment';
import urljoin from 'url-join';
import { Answer } from '../core/models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.questionsUrl = urljoin(environment.url_api, 'questions');
  }

  getQuestions(sort = '-createdAt'): Promise<void | Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}?sort=${sort}`)
      .toPromise()
      .then(response => response)
      .catch(this.handlerError);
  }

  getQuestion(id): Promise<void | Question> {
    return this.http.get<Question>(urljoin(this.questionsUrl, id))
      .toPromise()
      .then(response => response)
      .catch(this.handlerError);
  }

  addQuestion(question: Question) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.questionsUrl}${this.getToken()}`;
    return this.http.post(url, question, { headers });
  }

  addAnswer(data: Answer) {
    const url: string = urljoin(this.questionsUrl, data.question._id + '', 'answers') + this.getToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const answer = {
      description: data.description,
      question: {
        _id: data.question._id
      }
    };
    return this.http.post(url, answer, { headers });
  }

  getToken() {
    const token = localStorage.getItem('token');
    return `?token=${token}`;
  }

  handlerError(error: any) {
    const errMsg = error.message ? error.message : error.status ? `${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}
