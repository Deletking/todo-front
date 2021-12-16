import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registerUser(registerForm: NgForm) {
    if(registerForm.invalid) {
      return;
    }

    const {username, password} = registerForm.value;
    this.apiService.register(username, password).subscribe( res => {
      registerForm.reset();
      this.router.navigateByUrl('/login').then();
    });
  }

}
