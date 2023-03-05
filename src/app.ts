import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import { errorMiddleware , currentUser} from './middlewares';
import { User, SavingPlan, SavingPlanUser } from './models';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(currentUser);
app.use('/api');
app.use(errorMiddleware);

User.belongsToMany(SavingPlan, { through: SavingPlanUser });
SavingPlan.belongsToMany(User, { through: SavingPlanUser });

export default app;
