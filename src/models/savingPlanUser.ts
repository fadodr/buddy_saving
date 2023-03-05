import { sequelize } from '../configs';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from 'sequelize';
import { User, SavingPlan } from '.';

export class SavingPlanUser extends Model<
  InferAttributes<SavingPlanUser>,
  InferCreationAttributes<SavingPlanUser>
> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<string>;
  declare savingId: ForeignKey<string>;
  declare role: string;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

SavingPlanUser.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    savingId: {
      type: DataTypes.UUID,
      references: {
        model: SavingPlan,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM('owner', 'member'),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);
