import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import { errorMiddleware, currentUser } from './middlewares';
import { User, SavingPlan, SavingPlanUser, Invitation } from './models';
import routes from './routes';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(currentUser);
app.use('/api', routes);
app.use(errorMiddleware);

User.hasMany(Invitation, { foreignKey: 'recipientId' });
Invitation.belongsTo(User, { foreignKey: 'recipientId' });

SavingPlan.hasMany(Invitation, { foreignKey: 'savingId' });
Invitation.belongsTo(SavingPlan, { foreignKey: 'savingId' });

User.belongsToMany(SavingPlan, {
  through: SavingPlanUser,
  foreignKey: 'userId',
});
SavingPlan.belongsToMany(User, {
  through: SavingPlanUser,
  foreignKey: 'savingId',
});

export default app;
