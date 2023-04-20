import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {PrincipalComponent} from "./principal/principal.component";

const routes: Routes = [

  {path:'login',component:LoginComponent},
  {path:'home',component: HomeComponent},
  {path:'',component: PrincipalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
