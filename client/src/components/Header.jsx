import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "./Container"

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    console.log(userLogin);

    return (
        <header className="header">
            <Container>
                {/* Refactor to check if user is logged in and redirect them to /home instead */}
                <h3><Link className="link-text-large" to="/">SocialStory</Link></h3>
                {Object.keys(userLogin).length > 0
                    ? <Link className="btn font-small" to="/profile">Profile</Link>
                    : <Link className="btn font-small" to="/login">Login/Sign-Up</Link>
                }
            </Container>
        </header>
    )
};

export default Header;