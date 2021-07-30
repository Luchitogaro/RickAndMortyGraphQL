import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';
import { LocalStorageService } from '@app/shared/services/localStorage.service';

@Component({
  selector: 'app-characteres-list',
  templateUrl: './characteres-list.component.html',
  styleUrls: ['./characteres-list.component.scss'],
})
export class CharacteresListComponent {
  characters$ = this.dataSvc.characters$;
  showButton: boolean = false;

  private scrollHeight = 500;
  private pageNum: number = 1;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataSvc: DataService,
    private localStorageSvc: LocalStorageService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop(): void {
    this.document.documentElement.scrollTop = 0;
  }

  onScollDown(): void {
    this.pageNum = this.pageNum + 1;
    this.dataSvc.getCharactersByPage(this.pageNum);
  }
}
