import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyComponentComponent } from './dummy-component/dummy-component.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'login',
    component: DummyComponentComponent
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
