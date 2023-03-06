import { ForbiddenError, NotFoundError, UnAuthorizedError } from '../../errors';
import { generateRandStr } from '../../helpers';
import { SavingPlan, SavingPlanUser, User } from '../../models';
import { Invitation } from '../../models/invitation';
import { ControllerArgs } from '../../types';
import { config,SavingPlanRole, InviteStatus } from '../../configs';

export const inviteUsers = async ({ params, input, user }: ControllerArgs) => {
    const { savingId } = params;
    const { username } = input;

    const savingPlan = await SavingPlan.findByPk(savingId);
    if (!savingPlan) throw new NotFoundError('Saving plan not found');
    if (savingPlan.numberOfAcceptedBuddies >= 5)
        throw new ForbiddenError('Saving plan is filled up');

    let savingPlanUser =
        await SavingPlanUser.findOne({ where: { savingId, userId: user!.id } });
    if (!savingPlanUser) throw new ForbiddenError('You do not belong to this saving plan');
    if (savingPlanUser.role !== SavingPlanRole.owner)
        throw new UnAuthorizedError('Access denied');

    const existUser = await User.findOne({ where: { username } });
    if (!existUser) throw new NotFoundError('User not found');

    //throw error if the invited user already belong to the saving plan
    savingPlanUser = await SavingPlanUser.findOne({ where: { savingId, userId: existUser.id } });
    if (savingPlanUser) throw new ForbiddenError('User already belong to this saving plan');

    //if the user already have a pending invite, the resend the same invite again
    let token: string;
    const existInvite =
        await Invitation.findOne({ where: { savingId, recipientId: existUser.id } });
    if (existInvite && existInvite.status == InviteStatus.pending) {
        token = existInvite.token;
    }
    else {
        token = generateRandStr(48);

        await Invitation.create({
          token,
          savingId,
          recipientId: existUser.id,
        });
    }

    return {
        code: 200,
        message: 'Invite link generated successfully',
        data: `${config.baseUrl}/api/saving-plans/resolve/${token}`,
    };
}