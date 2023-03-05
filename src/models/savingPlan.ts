import { sequelize } from '../configs';
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';

export class SavingPlan extends Model<
  InferAttributes<SavingPlan>,
  InferCreationAttributes<SavingPlan>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare numberOfBuddies: number;
  declare isTarget: boolean;
  declare isAutomatic: boolean;
  declare frequency: string;
  declare endOfYearSavingAmount: number | null;
  declare numberOfMonthSaving: number;
  declare startDate: Date;
  declare endDate: Date;
  declare buddiesRelationship: string;
  declare numberOfAcceptedBuddies: CreationOptional<number>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

SavingPlan.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfBuddies: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isTarget: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAutomatic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    frequency: {
      type: DataTypes.STRING,
      defaultValue: false,
    },
    endOfYearSavingAmount: DataTypes.DOUBLE,
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numberOfMonthSaving: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buddiesRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberOfAcceptedBuddies: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);
