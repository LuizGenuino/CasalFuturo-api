export interface UserModel {
    id: string;
    name: string;
    email: string;
    password: string;
    lastLogin?: Date;
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpiresAt?: Date;
    verificationCode?: string;
    verificationCodeExpiresAt?: Date;
    cor_hex: string;
    salary?: number; // salário do usuário
    planId?: string; // chave estrangeira para a tabela Planos
    subscriptionExpiresAt?: Date; // data de validade da assinatura do usuário
    createdAt?: Date; // data de criação
    updatedAt?: Date; // data de atualização
}