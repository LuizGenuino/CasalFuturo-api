export interface UserTableModel{
    id: string;
    userId: string; // ID do usuário
    investmentTableId: string; // ID da tabela de investimento
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}