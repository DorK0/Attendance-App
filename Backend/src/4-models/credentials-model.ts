import Joi from "joi";

class CredentialsModel {

    //defining credentials type
    public username: string;
    public password: string;

    public constructor(credentials: CredentialsModel) {
        this.username = credentials.username;
        this.password = credentials.password;
    }

    //creating validation using Joi
    private static loginValidationSchema = Joi.object({
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50)
    });

    //creating public function that executing the private validation 
    //returning the error messages if happened
    public loginValidate(): string {
        const result = CredentialsModel.loginValidationSchema.validate(this);
        return result.error?.message;
    }
}

export default CredentialsModel;