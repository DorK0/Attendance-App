import Joi from "joi";
import Role from "./role-model";

class UserModel {
    //defining user type
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public role: Role;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    //creating validation using Joi
    private static registerValidationSchema = Joi.object({
        userId: Joi.forbidden(),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(8).max(50),
        role: Joi.forbidden(),
    });

    //creating public function that executing the private validation 
    //returning the error messages if happened
    public validateRegister(): string {
        const result = UserModel.registerValidationSchema.validate(this);
        return result.error?.message;
    }


}

export default UserModel;