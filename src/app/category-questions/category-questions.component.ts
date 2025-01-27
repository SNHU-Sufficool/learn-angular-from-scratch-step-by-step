import { QuestionsService } from "../services/questions.service";
import { AnswersService } from "../services/answers.service";
import { Question } from "../../../sdk/models/Question";
import { DeleteQuestionModalComponent } from "./delete-question/delete-question-modal.component";
import { NewQuestionModalComponent } from "./new-question/new-question-modal.component";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "category-questions",
  styleUrls: ["./category-questions.scss"],
  templateUrl: "./category-questions.component.html",
  imports: [MatListModule, RouterModule, MatButtonModule],
})
export class CategoryQuestionsComponent implements OnInit {
  questions: Array<Question>;
  categoryTitle: string;
  categorySlug: any;

  constructor(
    private route: ActivatedRoute,
    public questionsService: QuestionsService,
    public answersService: AnswersService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      let data = routeData["data"];
      if (data) {
        this.questions = data.questions;
        this.categoryTitle = data.category_title;
        this.categorySlug = data.category_slug;
      }
    });
  }

  getQuestions() {
    this.questionsService
      .getQuestionsByCategory(this.categorySlug)
      .subscribe((questions) => (this.questions = questions));
  }

  openNewQuestionModal(categorySlug) {
    let dialogRef = this.dialog.open(NewQuestionModalComponent, {
      data: { categorySlug: categorySlug },
    });

    dialogRef.afterClosed().subscribe((question) => {
      if (question) {
        this.addQuestionToList(question);
      }
    });
  }

  delete(questionId) {
    let dialogRef = this.dialog.open(DeleteQuestionModalComponent, {
      data: { questionId: questionId },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        // refresh the questions list
        var index = this.questions.findIndex(
          (question) => question.id === questionId
        );
        this.questions.splice(index, 1);

        this.answersService.getAnswers(questionId).subscribe((answers) => {
          for (let answer of answers) {
            this.answersService.deleteAnswer(answer.id);
          }
        });
      }
    });
  }

  addQuestionToList(question) {
    this.questions.push(question);
  }

  addPositiveVote(question) {
    question.positiveVotes += 1;
    this.questionsService.updateQuestion(question);
  }

  addNegativeVote(question) {
    question.negativeVotes += 1;
    this.questionsService.updateQuestion(question);
  }
}
