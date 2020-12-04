import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, from, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { PromptDialogComponent } from "./prompt-dialog/prompt-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) {}

  propmtModal(prompt: string, title: string): Observable<boolean> {
    const modal = this.ngbModal.open(PromptDialogComponent, {
      backdrop: "static",
    });

    modal.componentInstance.prompt = prompt;
    modal.componentInstance.title = title;

    return from(modal.result).pipe(
      catchError((error) => {
        console.warn(error);
        return of(false);
      })
    );
  }
}
