export interface ILancamento {
    id?: number;
    data: string;
    descricao: string;
    ehFixo: boolean;
    ehReceita: boolean;
    tipo: string;
    valor: number;
    mensagem?: string;
}