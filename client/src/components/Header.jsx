import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "./Container"
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin).userInfo;
    console.log(userInfo);

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header className="header">
            <Container>
                {/* Refactor to check if user is logged in and redirect them to /home instead */}
                <h3><Link className="link-text-large" to="/">SocialStory</Link></h3>
                {userInfo && Object.keys(userInfo).length > 0
                    ? (
                        <div>
                            <Link className="btn font-small" to="/profile">Profile</Link>
                            <Link 
                                style={
                                    {
                                        backgroundColor: "red",
                                        marginLeft: "2rem",
                                        color: "white"
                                    }
                                }
                                className="btn font-small"
                                onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        </div>
                    )
                    : <Link className="btn font-small" to="/login">Login/Sign-Up</Link>
                }
            </Container>
        </header>
    )
};

export default Header;