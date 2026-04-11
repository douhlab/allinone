import { Component } from '@angular/core';
import {ToastService} from "../../../services/toast/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  messages$ = this.toastService.messages$;

  constructor(private toastService: ToastService) {}
}
