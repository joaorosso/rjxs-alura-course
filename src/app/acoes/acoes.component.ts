import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  actions$ = this.acoesInput.valueChanges.pipe(
    startWith(''),
    filter(search => search.length >= 3 || !search.length),
    debounceTime(300),
    switchMap(search => this.acoesService.getActions(search))
  );

  constructor(private acoesService: AcoesService) { }
}
