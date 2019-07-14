import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from 'src/app/components/form/form.component';
import { LoginComponent } from 'src/app/components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'form', component: FormComponent},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
