import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signup') signupForm!: NgForm

  onSubmit() {
    const values = this.signupForm.value

    //terá todos os campos do meu form
    const user: User = {
      email: values.email,
      username: values.username,
      birthdate: values.birthdate,
      profile: 'assets/user_default.png',
    }

    this.authService.signup(values.email, values.password, user).subscribe({
      next: (creds) => {},
      error: (err) => {
        this.snackBar.open(err.code, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end'
        })
      }
    })
  }

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

}
