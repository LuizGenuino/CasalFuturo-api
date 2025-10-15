import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import bcrypt from "bcryptjs";
import { UserInstance } from "../types/user.types";
import { ENV } from "../utils/env";
import { calculateTokenExpiry } from "../utils/auth.utils";


const User = sequelize.define<UserInstance>("User", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue:
            DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100],
        },
    },
    lastLogin: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
    },
    resetPasswordExpiresAt: {
        type: DataTypes.DATE,
    },
    verificationCode: {
        type: DataTypes.STRING,
    },
    verificationCodeExpiresAt: {
        type: DataTypes.DATE,
    },
    tableInvitationToken: {
        type: DataTypes.STRING,
    },
    tableInvitationExpiresAt: {
        type: DataTypes.DATE,
    },
    cor_hex: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isHex: true,
        },
    },
    salary: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
            isFloat: true,
        },
    },
    planId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: "planos",
            key: "id",
        },
    },
    subscriptionExpiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        },
    }
}, {
    timestamps: true,
    tableName: "users",
    underscored: true,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(Number(ENV.BCRYPT_SALT_ROUNDS) || 10);
            user.password = await bcrypt.hash(user.dataValues.password, salt);

            if (user.verificationCode && !user.verificationCodeExpiresAt) {
                user.verificationCodeExpiresAt = calculateTokenExpiry(1) // 1 hour
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed("password")) {
                const salt = await bcrypt.genSalt(Number(ENV.BCRYPT_SALT_ROUNDS) || 10);
                user.password = await bcrypt.hash(user.dataValues.password, salt);
            }

            if (user.changed("verificationCode") && user.verificationCode && !user.verificationCodeExpiresAt) {
                user.verificationCodeExpiresAt = calculateTokenExpiry(1) // 1 hour
            }

            if (user.changed("resetPasswordToken") && user.resetPasswordToken && !user.resetPasswordExpiresAt) {
                user.resetPasswordExpiresAt = calculateTokenExpiry(1) // 1 hour
            }

            if (user.changed("tableInvitationToken") && user.tableInvitationToken && !user.tableInvitationExpiresAt) {
                user.tableInvitationExpiresAt = calculateTokenExpiry(24) // 24 hour
            }
        },
    },
});



export default User;

