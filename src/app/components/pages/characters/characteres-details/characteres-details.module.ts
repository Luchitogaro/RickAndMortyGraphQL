import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacteresDetailsRoutingModule } from './characteres-details-routing.module';
import { CharacteresDetailsComponent } from './characteres-details.component';
import { CharactersCardModule } from '../characters-card/characters-card.module';


@NgModule({
  declarations: [CharacteresDetailsComponent],
  imports: [
    CommonModule,
    CharacteresDetailsRoutingModule,
    CharactersCardModule
  ]
})
export class CharacteresDetailsModule { }
