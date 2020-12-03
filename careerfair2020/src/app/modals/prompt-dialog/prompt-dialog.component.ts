import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-prompt-dialog",
  templateUrl: "./prompt-dialog.component.html",
  styleUrls: ["./prompt-dialog.component.css"],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PromptDialogComponent implements OnInit {
  title: string|undefined;
  prompt: string|undefined;

  constructor(public activeModal: NgbActiveModal) {}
  ngOnInit() {}
}
