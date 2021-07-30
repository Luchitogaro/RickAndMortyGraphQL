import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../interfaces/data.interface';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private charactersFavSubject = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersFavSubject.asObservable();

  constructor(private toastrSvc: ToastrService) {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentFav = this.getFavoriteCharacters();
    const charFound = !!currentFav.find((fav: Character) => fav.id === id);

    charFound ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentFav = this.getFavoriteCharacters();
      localStorage.setItem(
        MY_FAVORITES,
        JSON.stringify([...currentFav, character])
      );
      this.charactersFavSubject.next([...currentFav, character]);
      this.toastrSvc.success(`${character.name} added to favorites`, 'RickAndMortyAPP')
    } catch (error) {
      console.error('Error saving to localStorage', error);
      this.toastrSvc.error(`Error adding to localStorage, ${error}`, 'RickAndMortyAPP')
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentFav = this.getFavoriteCharacters();
      const characters = currentFav.filter((item) => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      this.toastrSvc.warning(`Removed from favorites`, 'RickAndMortyAPP')
    } catch (error) {
        console.error('Error removing from localStorage', error);
        this.toastrSvc.error(`Error removing from localStorage, ${error}`, 'RickAndMortyAPP')
    }
  }

  getFavoriteCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.error('Error getting favorites from localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error cleaning localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoriteCharacters();
  }
}
