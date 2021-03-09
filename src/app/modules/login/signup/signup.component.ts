import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpFormModel = {
    username: "",
    password: "",
    verifyPassword: ""
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
    let fieldsNotFilled = [this.signUpFormModel.username, this.signUpFormModel.password, this.signUpFormModel.verifyPassword].some(f => f === "");

    if (fieldsNotFilled)
    {
      this.errorMessage = "Please fill in all fields."
      return;
    }
    if (this.signUpFormModel.password !== this.signUpFormModel.verifyPassword)
    {
      this.errorMessage = "Passwords don't match."
      return;
    }

    this.us.userExists(this.signUpFormModel.username).subscribe(data => {
      if (data.length > 0) {
        this.errorMessage = "User already exists."
        return;
      }

      this.us.createUser(this.signUpFormModel.username, this.signUpFormModel.password)
        .subscribe(data => {
          this.router.navigate(['/login']);
        },
        err => {
          this.errorMessage = err;
        });
    })

  }

}
