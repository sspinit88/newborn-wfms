import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SystemRoutingModule} from './system-routing.module';
import {SharedModule} from "../shared/shared.module";
import {SystemComponent} from './system/system.component';
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {LoaderComponent} from "./shared/components/loader/loader.component";

@NgModule({
  declarations: [
    SystemComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
  ]
})
export class SystemModule {
}
