import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Sensors-FE';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token) {
      this.userService.loadRole().subscribe({
        next: () => this.router.navigateByUrl('/')
      });
    }
  }
}
