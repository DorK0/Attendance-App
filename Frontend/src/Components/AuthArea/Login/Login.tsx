import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import AuthService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import "./Login.css";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();


    async function send(credentials: CredentialsModel) {
        try {
            await AuthService.login(credentials);
            notifyService.success("Welcome " + credentials.username + " 🫶🏽");
            navigate("/clock");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="Login Box">

            <Form onSubmit={handleSubmit(send)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Your Username" {...register("username", {
                        required: { value: true, message: "Missing username" },
                        minLength: { value: 5, message: "Username too short" },
                        maxLength: { value: 50, message: "Username too long" }
                    })} />
                    <Form.Text className="text-muted">
                        100% cool
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
                    Login
                </Button>
            </Form>

        </div>
    );
}

export default Login;
