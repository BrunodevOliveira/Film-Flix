import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToHome = () => redirectLoggedInTo(['/'])

const routes: Routes = [
  {//A URL para acessa esse componente será /login pois em app-routing eu deixei vazio a rota auth.module
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'registro',
    component: SignupComponent,
    ...canActivate(redirectLoggedInToHome)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
