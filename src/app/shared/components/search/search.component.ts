import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '@app/shared/services/data.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  search = new FormControl('');
  private destroy$ = new Subject<unknown>();

  constructor(private dataSvc: DataService) {
    this.onSearch();
  }

  onClear(): void {
    this.dataSvc.getDataAPI();
    this.search.reset();
  }

  private onSearch(): void {
    this.search.valueChanges
      .pipe(
        map((search) => search?.toLowerCase().trim()),
        debounceTime(300),
        distinctUntilChanged(),
        filter((search) => search !== '' && search?.length > 2),
        tap((search) => this.dataSvc.filterData(search)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
