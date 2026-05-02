import {Component, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  @Input() code = 500;
  @Input() title = 'Something went wrong';
  @Input() message = 'Unexpected error occurred';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const data = this.route.snapshot.data;

    this.code = data['code'];
    this.title = data['title'];
    this.message = data['message'];
  }
}
