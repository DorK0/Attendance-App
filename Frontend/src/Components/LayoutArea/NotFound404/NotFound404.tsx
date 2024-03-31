import { NavLink } from "react-router-dom";
import "./NotFound404.css";

function NotFound404(): JSX.Element {
    return (
        <div className="NotFound404">
            <main>
                <h1>4<span><i className="fas fa-ghost"></i></span>4</h1>
                <h2>Error: 404 page not found</h2>
            </main>
        </div>
    );
}

export default NotFound404;
