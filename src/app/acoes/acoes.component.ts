import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AcoesService } from './acoes.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  actions$ = this.acoesService.getActions();

  constructor(private acoesService: AcoesService) { }
}
