import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Validators,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { QuestionsService } from "../../services/questions.service";
import { SlugifyPipe } from "../../shared/slugify.pipe";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "new-question-modal",
  templateUrl: "./new-question-modal.component.html",
  exportAs: "newQuestionModal",
  styleUrls: ["../../styles/modals.scss"],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  standalone: true,
  providers: [QuestionsService, SlugifyPipe],
})
export class NewQuestionModalComponent implements OnInit {
  questionForm: FormGroup;

  constructor(
    public questionsService: QuestionsService,
    private slugifyPipe: SlugifyPipe,
    public thisDialogRef: MatDialogRef<NewQuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any
  ) {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      question: new FormControl("", Validators.required),
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values) {
    let data: any = {};
    data.question = values.question;
    data.questionSlug = this.slugifyPipe.transform(values.question);
    data.categorySlug = this.modalData.categorySlug;

    //create new question
    this.questionsService.createQuestion(data).subscribe((question) => {
      this.thisDialogRef.close(question);
      this.questionForm.reset();
    });
  }
}
