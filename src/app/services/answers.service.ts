import { Injectable } from "@angular/core";
import { AnswerApi, Answer } from "../../../sdk";

@Injectable()
export class AnswersService {
  constructor(private answerApi: AnswerApi) {}

  getAnswers(questionId) {
    let query = {
      questionId: questionId,
    };
    return this.answerApi.find<Answer>({ where: query });
  }

  getAnswer(anserId) {
    let query = {
      id: anserId,
    };
    return this.answerApi.find<Answer>({ where: query });
  }

  deleteAnswer(answerId) {
    return this.answerApi.deleteById<Answer>(answerId);
  }

  updateAnswer(values) {
    let data = new Answer();
    data.answer = values.answer;
    data.positiveVotes = values.positiveVotes;
    data.negativeVotes = values.negativeVotes;
    data.questionId = values.questionId;
    return this.answerApi.updateAttributes<Answer>(values.id, data);
  }

  createAnswer(values) {
    let data = new Answer();
    data.answer = values.answer;
    data.questionId = values.questionId;
    return this.answerApi.create<Answer>(data);
  }

  countAnswers(questionId) {
    let query = {
      questionId: questionId,
    };
    return this.answerApi.count({ where: query });
  }
}
