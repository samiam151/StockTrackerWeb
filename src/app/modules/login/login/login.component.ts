import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public signUpFormModel = {
    username: "",
    password: ""
  }
  public errorMessage: string = null;

  constructor(
    private us: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit()
  {
    this.errorMessage = null;
    let fieldsNotFilled = [this.signUpFormModel.username, this.signUpFormModel.password].some(f => f === "");

    if (fieldsNotFilled)
    {
      this.errorMessage = "Please fill in all fields."
      return;
    }

    this.us.authenticateUser(
      this.signUpFormModel.username,
      this.signUpFormModel.password)
    .subscribe(data => {
      this.router.navigate(['/']);
    }, err => {
      this.errorMessage = "Username or password is incorrect."
    })


  }
}
