import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character-list',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'episodes',
    loadChildren: () =>
      import('./components/pages/episodes/episodes.module').then(
        (m) => m.EpisodesModule
      ),
  },
  {
    path: 'character-details/:id',
    loadChildren: () =>
      import(
        './components/pages/characters/characteres-details/characteres-details.module'
      ).then((m) => m.CharacteresDetailsModule),
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import(
        './components/pages/characters/characteres-list/characteres-list.module'
      ).then((m) => m.CharacteresListModule),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./components/pages/about/about.module').then(
        (m) => m.AboutModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
