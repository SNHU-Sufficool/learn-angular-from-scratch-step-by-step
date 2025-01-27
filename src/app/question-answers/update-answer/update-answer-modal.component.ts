import { Component, OnInit, Inject } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { AnswersService } from "../../services/answers.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "update-answer-modal",
  templateUrl: "./update-answer-modal.component.html",
  exportAs: "updateAnswerModal",
  styleUrls: ["../../styles/modals.scss"],
  imports: [FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class UpdateAnswerModalComponent implements OnInit {
  answerForm: FormGroup;

  constructor(
    public answersService: AnswersService,
    public thisDialogRef: MatDialogRef<UpdateAnswerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any
  ) {}

  ngOnInit(): void {
    console.log(this.modalData.answer);
    this.answerForm = new FormGroup({
      answer: new FormControl(
        this.modalData.answer.answer,
        Validators.required
      ),
    });
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

  onSubmit(values) {
    let newAnswer = this.modalData.answer;
    newAnswer.answer = values.answer;
    this.answersService.updateAnswer(newAnswer).subscribe((answer) => {
      this.thisDialogRef.close(answer);
      this.answerForm.reset();
    });
  }
}
