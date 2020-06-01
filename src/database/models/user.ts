import { Document, Model, model, Schema } from "mongoose";
import { IUser } from "../../interfaces/IUser";

export interface IUserModel extends IUser, Document { }

const userSchema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    email: {
        type: String,
        unique: true,
    },
    images: [{ type: Schema.Types.ObjectId, ref: "Image"}],
}, {
    timestamps: true,
});

userSchema.index({
    email: 1,
}, {
    unique: true,
});

const User: Model<IUserModel> = model("User", userSchema);

export { User };
