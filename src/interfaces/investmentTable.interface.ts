export interface InvestmentTableModel {
    id: string;
    creatorId: string;
    initialValue: number; // valor inicial da tabela
    interval: number; // tamanho di intervalo entre o numero atual e o proximo 
    amount: number;  // quantidade de numeros que tera na tabela
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}