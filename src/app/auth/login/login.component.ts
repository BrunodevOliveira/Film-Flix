import { AuthService } from './../../core/services/auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //@ViewChild é um decorator:  maneira do TS pegar o meu formulário feito no HTML.
    //Coloco dentro dos parenteses o nome da variável criada no HTML do Form #login
    //armazeno esses valores em uma variávvel --> login
    //essa ! permite que a variável login não seja iniciada e tipo ela como NgForm pois minha variável do HTML #login possui esse tipo
  @ViewChild('login') login!: NgForm


  onSubmit() {
    const email = this.login.value.email as string
    const password = this.login.value.password as string

    this.authService.login(email, password).subscribe({
      next: (creds) => { //TODO: Ir para home logar

      },
      error: (err) => {

        let message = ''

        switch(err.code) {
          case "auth/invalid-email":
            message = 'Email inválido'
            break
          case "auth/user-not-found":
            message = 'Usuário não encontrado'
            break
        }

        this.snackBar.open(message, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end'
        })
      }
    })
  }

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }
}
