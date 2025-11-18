import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public errorCode!: string;

  constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.errorCode = this.route.snapshot.data['errorCode'];
  }
}
