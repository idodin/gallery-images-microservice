import { User, IUserModel } from "../models/user";

export const userDBInteractions = {

    find: (userId: string, option: string = "-password"): Promise<IUserModel> => {
        return User.findOne({ _id: userId }).select(option).exec();
    },
};