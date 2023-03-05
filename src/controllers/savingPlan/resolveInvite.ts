import { ForbiddenError, NotFoundError } from '../../errors';
import { Invitation, SavingPlan, SavingPlanUser } from '../../models';
import { ControllerArgs } from '../../types';
import { InviteStatus, SavingPlanRole } from '../../configs';

export const resolveInvite = async ({ params, query }: ControllerArgs) => {
  const { token } = params;
  const { status } = query;

  const invite = await Invitation.findOne({ where: { token } });
  if (!invite) throw new NotFoundError('Invalid invite link');
  if (invite.status !== InviteStatus.pending)
    throw new ForbiddenError('Expired link');

  const savingPlan = await SavingPlan.findByPk(invite.savingId);
  if (!savingPlan) throw new NotFoundError('Saving plan not found');
  if (status == InviteStatus.join && savingPlan.numberOfAcceptedBuddies >= 5)
    throw new ForbiddenError('Saving plan is filled up');

  invite.set({
    status,
  });
  await invite.save();

  if (status === InviteStatus.decline) {
    return {
      code: 200,
      message: 'Invite declined',
    };
  }

  //update the saving_plan_user and add this user
  const savingPlanUser = await SavingPlanUser.create({
    savingId: invite.savingId,
    userId: invite.recipientId,
    role: SavingPlanRole.memeber,
  });

  // increment the saving plan number of users;
  savingPlan.numberOfAcceptedBuddies += 1;
  await savingPlan.save();

  return {
    code: 200,
    message: 'You have now join this saving plan',
    data: savingPlanUser,
  };
};
