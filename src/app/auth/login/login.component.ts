import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    console.log(this.login.value)
  }

  constructor() { }

  ngOnInit(): void {
  }



}
