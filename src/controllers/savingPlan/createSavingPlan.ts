import { ForbiddenError } from '../../errors';
import { SavingPlan, SavingPlanUser } from '../../models';
import { ControllerArgs } from '../../types';
import { sequelize, SavingPlanRole } from '../../configs';

export const createSavingPlan = async ({ input, user }: ControllerArgs) => {
  const { title } = input;
  const userId = user!.id;

  const existTitle = await SavingPlan.findOne({ where: { title } });
  if (existTitle)
    throw new ForbiddenError('Title already exist, choose a new title');

  const txn = await sequelize.transaction();

  try {
    const newSavingPlan = (
      await SavingPlan.create(
        {
          title,
          numberOfBuddies: input.numberOfBuddies,
          isTarget: input.isTarget,
          isAutomatic: input.isAutomatic,
          frequency: input.frequency,
          endOfYearSavingAmount: input.endOfYearSavingAmount,
          numberOfMonthSaving: input.numberOfMonthSaving,
          startDate: input.startDate,
          endDate: input.endDate,
          buddiesRelationship: input.buddiesRelationship,
        },
        { transaction: txn }
      )
    ).toJSON();

    await SavingPlanUser.create(
      {
        savingId: newSavingPlan.id,
        userId,
        role: SavingPlanRole.owner,
      },
      { transaction: txn }
    );

    await txn.commit();

    return {
      code: 201,
      message: 'Saving plan created successfully',
      data: newSavingPlan,
    };
  } catch (error) {
    await txn.rollback();
    throw error;
  }
};
