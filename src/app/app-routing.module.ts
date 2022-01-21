import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

//criando Leazing loading
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)
  },
  {
    path:'**', //rota final, quando digito uma rota inexistente
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
