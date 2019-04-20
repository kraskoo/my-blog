import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PipeModule } from '../pipes/pipe.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    PipeModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule {}
