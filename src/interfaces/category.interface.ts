export interface CategoryModel {
    id: number;
    name: string; // nome da categoria
    cor_hex: string;
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}
