import { Injectable } from "@angular/core";
import { QuestionApi, Question, LoopBackFilter } from "../../../sdk";
import { Observable } from "rxjs";

@Injectable()
export class QuestionsService {
  constructor(private questionApi: QuestionApi) {}

  getQuestions() {
    let filter: LoopBackFilter = {
      include: {
        relation: "answers",
      },
    };
    return this.questionApi.find<Question>(filter);
  }

  getQuestion(questionId) {
    let query = {
      id: questionId,
    };
    return this.questionApi.find<Question>({ where: query });
  }

  getQuestionsByCategory(category_slug): Observable<Question[]> {
    let filter: LoopBackFilter = {
      include: {
        relation: "answers",
      },
      where: {
        categorySlug: category_slug,
      },
    };
    return this.questionApi.find<Question>(filter);
  }

  getQuestionBySlug(slug) {
    let filter: LoopBackFilter = {
      include: {
        relation: "answers",
      },
      where: {
        questionSlug: slug,
      },
    };
    return this.questionApi.findOne<Question>(filter);
  }

  deleteQuestion(questionId) {
    return this.questionApi.deleteById<Question>(questionId);
  }

  updateQuestion(question) {
    return this.questionApi.updateAttributes<Question>(question.id, question);
  }

  createQuestion(values) {
    let data = new Question();
    data.question = values.question;
    data.questionSlug = values.questionSlug;
    data.categorySlug = values.categorySlug;

    return this.questionApi.create<Question>(data);
  }
}
