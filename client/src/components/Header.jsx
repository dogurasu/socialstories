import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="header">
            <div className="container">
                {/* Refactor to check if user is logged in and redirect them to /home instead */}
                <h3><Link className="link-text-large" to="/">SocialStory</Link></h3>
                <Link className="btn btn-text" to="/login">Login/Sign-Up</Link>
            </div>
        </header>
    )
};

export default Header;