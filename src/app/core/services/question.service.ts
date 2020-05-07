import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Question } from '../models/question.model';
import { environment } from 'src/environments/environment';
import urljoin from 'url-join';

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

  getQuestions(): Promise<void | Question[]> {
    return this.http.get<Question[]>(this.questionsUrl)
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
    return this.http.post(this.questionsUrl, question, { headers });
  }

  handlerError(error: any) {
    const errMsg = error.message ? error.message : error.status ? `${error.statusText}` : 'Server error';
    console.log(errMsg);
  }
}
