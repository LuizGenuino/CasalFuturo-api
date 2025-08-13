export interface SalaryDivisionModel {
    id: number;
    userId: string; // ID do usuário
    categoryId: string; // ID da categoria
    name: string; // nome da divisão salarial
    type: string; // tipo da divisão salarial (ex: "porcentagem", "valor em R$")
    value: number; // valor da divisão salarial
    cor_hex: string;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}