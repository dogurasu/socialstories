import { Link } from "react-router-dom";

const LandingScreen = () => {
    return (
        <div className="landing">
            <div className="landing-text">
                <h1>Got a Story? Share it.</h1>
                <div className="landing-navigation">
                    <Link className="btn btn-smaller btn-text" to="/login">Login/Sign-Up</Link>
                    <Link className="btn btn-smaller landing-navigation-about">
                        <span>About SocialStory</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingScreen;