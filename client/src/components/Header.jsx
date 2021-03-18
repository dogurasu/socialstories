import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header>
            {/* Refactor to check if user is logged in and redirect them to /home instead */}
            <Link to="/">SocialStory</Link>
            
        </header>
    )
};

export default Header;