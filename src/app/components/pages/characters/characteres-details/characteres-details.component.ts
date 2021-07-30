import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from '@apollo/client/utilities';
import { DataService } from '@app/shared/services/data.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-characters-details',
  templateUrl: './characteres-details.component.html',
  styleUrls: ['./characteres-details.component.scss']
})
export class CharacteresDetailsComponent implements OnInit {
  characterId: string;
  characterDetail$: Observable<any>;

  constructor(private route: ActivatedRoute, private dataSvc: DataService) { 
    this.route.params.pipe(
      take(1),
      tap(({id}) => this.characterDetail$ = this.dataSvc.getDetails(id))
    ).subscribe();
  }

  ngOnInit(): void {
  }

}
