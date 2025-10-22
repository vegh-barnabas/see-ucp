import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  errorCode!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.errorCode = this.route.snapshot.data['errorCode'];
  }
}
