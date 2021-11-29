import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getActions() {
    return this.httpClient.get<any>('http://localhost:3000/acoes')
      .pipe(
        tap((value) => console.log(value)),
        pluck('payload'),
        map((actions) =>
          actions.sort((actionA: Acao, actionB: Acao) =>
            this.orderByCode(actionA, actionB))
        ));
  }

  private orderByCode(actionA: Acao, actionB: Acao) {
    if (actionA.codigo > actionB.codigo) {
      return 1;
    } else if (actionA.codigo < actionB.codigo) {
      return -1
    } else {
      return 0
    }
  }
}
