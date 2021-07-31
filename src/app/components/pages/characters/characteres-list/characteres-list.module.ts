import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CharactersCardModule } from '@characters/characters-card/characters-card.module';
import { CharacteresListRoutingModule } from './characteres-list-routing.module';
import { CharacteresListComponent } from './characteres-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchModule } from '@app/shared/components/search/search.module';

@NgModule({
  declarations: [CharacteresListComponent],
  imports: [CommonModule, CharacteresListRoutingModule, CharactersCardModule, InfiniteScrollModule, SearchModule],
})
export class CharacteresListModule {}
