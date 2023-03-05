import dotenv from 'dotenv';
dotenv.config();

export const config = Object.freeze({
    baseUrl : process.env.BASE_URL,
    port: process.env.PORT,
    
    //database
    dbName: process.env.MYSQL_DATABASE as string,
    dbUser: process.env.MYSQL_USER as string,
    dbPassword: process.env.MYSQL_PASSWORD as string,
    dbHost: process.env.MYSQL_HOST as string,

    //jwt
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET as string,
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as string,
});

export enum InviteStatus {
    pending = 'pending',
    join = 'join',
    decline = 'decline'
}

export enum SavingPlanRole {
    owner = 'owner',
    memeber = 'memeber'
}