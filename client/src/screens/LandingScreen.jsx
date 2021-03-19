// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../components/Container.jsx";
import landingGraphic1 from "../static/img/landing_graphic_1.svg";
import landingGraphic2 from "../static/img/landing_graphic_2.svg";
import landingGraphic4 from "../static/img/landing_graphic_4.svg";
// import { listAllStories } from "../actions/storyActions.js";

const LandingScreen = () => {
    // const dispatch = useDispatch();
    // const state = useSelector(state => state);

    // // fetch all stories
    // useEffect(() => {
    //     console.log("dispatch useEffect");
    //     dispatch(listAllStories());
    // }, [dispatch])

    // useEffect(() => {
    //     console.log("every render useEffect");
    //     console.log(state);
    // })

    return (
        <>
            <div className="landing">
                <Container>
                    <div className="landing-text">
                        <h1 className="title-text text-white">Got a Story? Share it.</h1>
                        <div className="landing-navigation">
                            <Link className="btn btn-text font-small" to="/login">Login/Sign-Up</Link>
                            <Link className="landing-navigation-about font-small" to="/stories">
                                <span>Check out Stories</span>
                            </Link>
                        </div>
                    </div>
                    <div className="landing-graphic">
                        <img alt="landing graphic" className="svg svg__main" src={landingGraphic4}></img>
                    </div>
                </Container>
            </div>
            <Container>
                <div className="main">
                    <div className="main__section">
                        <img className="svg main__section__graphic" alt="landing graphic 1" src={landingGraphic1}></img>
                        <p className="main__section__text font-small">Everyone has a story to share. If you find yourself itching to share it, why not share it here on SocialStory?</p>
                    </div>
                    <div className="main__section">
                        <p className="main__section__text font-small">Here on SocialStory, you’re able to post, create, and update your own content. Additionally, you can see what other people are saying.</p>
                        <img className="svg svg--second main__section__graphic" alt="landing graphic 2" src={landingGraphic2}></img>
                    </div>
                </div>
            </Container>
            <div className="cta">
                <Container>
                    <h2 className="font-large">Start Writing Now</h2>
                    <Link to="/stories" className="btn btn-text btn--main font-small">Read Stories Now</Link>
                </Container>
            </div>
        </>
    )
}

export default LandingScreen;