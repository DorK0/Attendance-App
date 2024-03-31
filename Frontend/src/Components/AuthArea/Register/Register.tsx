import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import AuthService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await AuthService.register(user);
            notifyService.success("User Added 🤘🏽🥳!");
            navigate("/employees-attendance");
        }
        catch (err: any) {
            notifyService.error(err.message);
        }
    }

    return (
        <div className="Register Box">

            <Form onSubmit={handleSubmit(send)}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" {...register("firstName", {
                        required: { value: true, message: "Missing first name" },
                        pattern: { value: /^[A-za-z]+$/, message: "We can't understand nothing but English" },
                        minLength: { value: 2, message: "Your name contains less then 2 letters?😵‍💫" },
                        maxLength: { value: 50, message: "We think that name is too long🤔" }
                    })} />
                </Form.Group>
                <span>{errors.firstName?.message}</span>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" {...register("lastName", {
                        required: { value: true, message: "Missing last name" },
                        pattern: { value: /^[A-za-z]+$/, message: "We can't understand nothing but English" },
                        minLength: { value: 2, message: "Your name contains less then 2 letters?😵‍💫" },
                        maxLength: { value: 50, message: "We think that name is too long🤔" }
                    })} />
                </Form.Group>
                <span>{errors.lastName?.message}</span>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Your Username" {...register("username", {
                        required: { value: true, message: "Missing username" },
                        minLength: { value: 5, message: "We need you to think on something a little bit longer 🙏🏽" },
                        maxLength: { value: 50, message: "Wow 🤯 not that long..." }
                    })} />
                    <Form.Text className="text-muted">
                        Just a reminder for you to stay unique
                    </Form.Text>
                </Form.Group>
                <span>{errors.username?.message}</span>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password", {
                        required: { value: true, message: "Missing password" },
                        minLength: { value: 5, message: "Password should be at least 8 characters" },
                        maxLength: { value: 50, message: "Password should be less then 50 characters" }
                    })} />
                    <Form.Text className="text-muted">
                        Your password is safe with us
                    </Form.Text>
                </Form.Group>
                <span>{errors.password?.message}</span>
                <Button variant="primary" type="submit">
                    Add User
                </Button>
            </Form>




        </div>
    );
}

export default Register;
