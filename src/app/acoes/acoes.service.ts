import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getActions(search?: string) {
    const params = search ? new HttpParams().append('valor', search) : undefined;
    return this.httpClient.get<AcoesAPI>('http://localhost:3000/acoes', { params })
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
