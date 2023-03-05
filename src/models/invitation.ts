import { sequelize } from '../configs';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from 'sequelize';
import { SavingPlan, User } from '../models';

export class Invitation extends Model<
  InferAttributes<Invitation>,
  InferCreationAttributes<Invitation>
> {
  declare id: CreationOptional<string>;
  declare token: CreationOptional<string>;
  declare savingId: ForeignKey<string>;
  declare recipientId: ForeignKey<string>;
  declare status: CreationOptional<string>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Invitation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    savingId: {
      type: DataTypes.UUID,
      references: {
        model: SavingPlan,
        key: 'id',
      },
    },
    recipientId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
        status : {
            type: DataTypes.ENUM('join', 'decline', 'pending'),
            defaultValue : 'pending'
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);
