import { ForbiddenError, NotFoundError, UnAuthorizedError } from '../../errors';
import { Invitation, SavingPlan, SavingPlanUser } from '../../models';
import { ControllerArgs } from '../../types';
import { InviteStatus, SavingPlanRole, sequelize } from '../../configs';

export const resolveInvite = async ({
  params,
  input,
  user,
}: ControllerArgs) => {
  const { token } = params;
  const { status } = input;

  const invite = await Invitation.findOne({ where: { token } });
  if (!invite) throw new NotFoundError('Invalid invite link');
  if (invite.status !== InviteStatus.pending)
    throw new ForbiddenError('Expired link');
  //  only the user invite that accept or join the saving plan
  if (invite.recipientId !== user?.id)
    throw new UnAuthorizedError('Access denied');

  const savingPlan = await SavingPlan.findByPk(invite.savingId);
  if (!savingPlan) throw new NotFoundError('Saving plan not found');
  if (status == InviteStatus.join && savingPlan.numberOfAcceptedBuddies >= 5)
    throw new ForbiddenError('Saving plan is filled up');

  const txn = await sequelize.transaction();

  try {
    invite.set({
      status,
    });
    await invite.save({ transaction: txn });

    if (status === InviteStatus.decline) {
      await txn.commit();
      return {
        code: 200,
        message: 'Invite declined',
      };
    }

    //update the saving_plan_user and add this user
    const savingPlanUser = await SavingPlanUser.create(
      {
        savingId: invite.savingId,
        userId: invite.recipientId,
        role: SavingPlanRole.member,
      },
      { transaction: txn }
    );

    // increment the saving plan number of users;
    savingPlan.numberOfAcceptedBuddies += 1;
    await savingPlan.save({ transaction: txn });

    await txn.commit();

    return {
      code: 200,
      message: 'You have now join this saving plan',
      data: savingPlanUser,
    };
  } catch (error) {
    await txn.rollback();
    throw error;
  }
};
