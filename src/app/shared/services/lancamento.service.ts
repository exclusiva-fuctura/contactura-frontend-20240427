import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// libs
import { Observable } from 'rxjs';
// services
import { AppState } from '../../app.state';
import { DaoService } from './dao.service';
// systems
import { AppSettings } from '../../app.settings';
import { OperacaoTypeEnum } from '../enums/operacao-type.enum';
// models
import { IReceita } from '../models/receita.interface';
import { IDespesa } from '../models/despesa.interface';
import { ILancamento } from '../models/lancamento.interface';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  constructor(
    private state: AppState,
    private dao: DaoService
  ) { }

  get modoEdicao(): boolean {
    return this.state.operacao === OperacaoTypeEnum.EDITAR;
  }

  set modoEdicao(ehEdicao: boolean) {
    if (ehEdicao) {
      this.state.operacao = OperacaoTypeEnum.EDITAR;
    } else {
      this.state.operacao = OperacaoTypeEnum.SALVAR;
    }
  }

  get despesaSelecionada(): IDespesa {
    return this.state.despesaSelecionada;
  }

  set despesaSelecionada(selecionada: IDespesa) {
    this.state.despesaSelecionada = selecionada;
  }

  get receitaSelecionada(): IReceita {
    return this.state.receitaSelecionada;
  }

  set receitaSelecionada(selecionada: IReceita) {
    this.state.receitaSelecionada = selecionada;
  }


  /**
   * criar uma nova despesa
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento criada
   */
  criarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.post<ILancamento>(AppSettings.API_LANCAMENTOS,
      this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * criar uma nova receita
   * @param receita instancia de uma receita
   * @returns retorna objeto lancamento criada
   */
  criarReceita(receita: IReceita): Observable<HttpResponse<ILancamento>> {
    return this.dao.post<ILancamento>(AppSettings.API_LANCAMENTOS,
      this.receitaToLancamento(receita), DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * atualiza uma despesa existente
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento alterada
   */
  atualizarDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.put<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`,
    this.despesaToLancamento(despesa), DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * atualiza uma receita existente
   * @param receita instancia de uma receita
   * @returns retorna objeto lancamento alterada
   */
  atualizarReceita(receita: IReceita): Observable<HttpResponse<ILancamento>> {
    return this.dao.put<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${receita.id}`,
    this.receitaToLancamento(receita), DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * listar despesas criadas
   * @returns retorna lista de lancamentos
   */
  listaLancamentos(): Observable<HttpResponse<ILancamento[]>> {
    return this.dao.get<ILancamento[]>(AppSettings.API_LANCAMENTOS, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * recupera a despesa do id informado
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento
   */
  obterDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.get<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * recupera a receita do id informado
   * @param receita instancia de uma receita
   * @returns retorna objeto lancamento
   */
  obterReceita(receita: IReceita): Observable<HttpResponse<ILancamento>> {
    return this.dao.get<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${receita.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * reove uma despesa existe
   * @param despesa instancia de uma despesa
   * @returns retorna objeto lancamento removida
   */
  removerDespesa(despesa: IDespesa): Observable<HttpResponse<ILancamento>> {
    return this.dao.delete<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${despesa.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * reove uma receita existe
   * @param receita instancia de uma receita
   * @returns retorna objeto lancamento removida
   */
  removerReceita(receita: IReceita): Observable<HttpResponse<ILancamento>> {
    return this.dao.delete<ILancamento>(`${AppSettings.API_LANCAMENTOS}/${receita.id}`, DaoService.MEDIA_TYPE_APP_JSON);
  }

  /**
   * Converter IDespesa em Lancamento
   * @param despesa Recebe uma Receita
   * @returns Um lançamento
   */
  private despesaToLancamento(despesa: IDespesa): ILancamento {
    const lancamento: ILancamento = {
      data: despesa.data,
      descricao: despesa.descricao,
      ehFixo: despesa.ehFixo,
      tipo: despesa.tipo,
      valor: despesa.valor,
      ehReceita: false,
      id: despesa.id
    };
    return lancamento;
  }

  /**
   * Converter IReceita em Lancamento
   * @param despesa Recebe uma Despesa
   * @returns Um lançamento
   */
  private receitaToLancamento(receita: IReceita): ILancamento {
    const lancamento: ILancamento = {
      data: receita.data,
      descricao: receita.descricao,
      ehFixo: receita.ehFixo,
      tipo: receita.tipo,
      valor: receita.valor,
      ehReceita: true,
      id: receita.id
    };
    return lancamento;
  }
}
