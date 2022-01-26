import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NotFoundComponent } from './../core/components/not-found/not-found.component';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { TvDetailComponent } from './tv-detail/tv-detail.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login'])

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'perfil',
    component: ProfileComponent,
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path:'movie/:id', //maneira de dizer ao angular que essa rota é dinâmica
    component: MovieDetailComponent

  },
  {
    path:'tv/:id', //maneira de dizer ao angular que essa rota é dinâmica
    component: TvDetailComponent

  },
  {
    path:'**', //rota final, quando digito uma rota inexistente
    component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
