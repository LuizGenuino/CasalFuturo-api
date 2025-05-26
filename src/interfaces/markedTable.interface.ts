export interface MarkedTableModel {
    id: string;
    userId: string; // ID do usuário
    investmentTableId: string; // ID da tabela de investimento
    markedNumber: number; // número marcado na tabela
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}
