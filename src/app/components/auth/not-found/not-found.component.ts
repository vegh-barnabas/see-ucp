import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
