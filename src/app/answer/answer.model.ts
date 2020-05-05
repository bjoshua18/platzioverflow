import { Question } from '../question/question.model';

// Provisional
export class User {
  constructor(
    public firstName: string,
    public lastName: string
  ) { }
}
// Fin provisional

export class Answer {
  constructor(
    public description: string,
    public question: Question,
    public createdAt?: Date,
    public user?: User
  ) { }
}
