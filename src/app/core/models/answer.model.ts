import { Question } from './question.model';
import { User } from './user.model';

export class Answer {
  constructor(
    public description: string,
    public question: Question,
    public createdAt?: Date,
    public user?: User
  ) { }
}
