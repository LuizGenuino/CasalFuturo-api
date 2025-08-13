// src/DTOs/user.dto.ts

import User from "../models/User";

export class UserDTO {
  static toJson(
    user: typeof User | null
  ): Omit<
    typeof User,
    | "password"
    | "verificationCode"
    | "resetPasswordToken"
    | "verificationCodeExpiresAt"
    | "resetPasswordExpiresAt"
  > | null {
    if (!user) {
      return null;
    }

    // Se for uma instância Sequelize, usa .get() para pegar o objeto plano
    const userObj =
      typeof (user as any).get === "function" ? (user as any).get() : user;

    // Remove os campos sensíveis
    const {
      password,
      verificationCode,
      resetPasswordToken,
      verificationCodeExpiresAt,
      resetPasswordExpiresAt,
      ...safeData
    } = userObj;

    return safeData as Omit<
      typeof User,
      | "password"
      | "verificationCode"
      | "verificationCodeExpiresAt"
      | "resetPasswordToken"
      | "resetPasswordTokenExpiresAt"
    >;
  }
}
