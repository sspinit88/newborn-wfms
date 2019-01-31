import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SystemComponent} from "./system/system.component";

const routes: Routes = [
  {
    path: 'system',
    component: SystemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
