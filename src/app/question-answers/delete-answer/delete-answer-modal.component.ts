import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AnswersService } from "../../services/answers.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "delete-answer-modal",
  templateUrl: "delete-answer-modal.component.html",
  styleUrls: ["../../styles/modals.scss"],
  imports: [MatButtonModule],
})
export class DeleteAnswerModalComponent {
  constructor(
    public thisDialogRef: MatDialogRef<DeleteAnswerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    public answersService: AnswersService
  ) {}

  onCloseConfirm() {
    this.answersService
      .deleteAnswer(this.modalData.answerId)
      .subscribe((res) => {
        this.thisDialogRef.close(true);
      });
  }

  onCloseCancel() {
    this.thisDialogRef.close(false);
  }
}
