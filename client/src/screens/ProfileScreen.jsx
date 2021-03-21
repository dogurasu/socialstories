import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import StoryCard from "../components/StoryCard";
import { 
    getSingleUser,
    updateUser,
    getUserStories,
} from "../actions/userActions";

const ProfileScreen = (props) => {
    const [email, setEmail] = useState('');
    const [summary, setSummary] = useState('');
    const [update, setUpdate] = useState(false);
    // const [password, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const userUpdate = useSelector(state => state.userUpdate).update;
    const userDetails = useSelector(state => state.userDetails).userDetails;
    const userStories = useSelector(state => state.userStories);
    const dispatch = useDispatch();
    const {history} = props;

    // initial render, get single user
    useEffect(() => {
        // console.log(userLogin);
        if (userLogin.userInfo && Object.keys(userLogin.userInfo).length > 0) {
            dispatch(getSingleUser(userLogin.userInfo._id));
        } else {
            console.log('user not logged in');
            history.push("/login");
        }

        if (userDetails && Object.keys(userDetails).length > 0) {
            setSummary(userDetails.summary);
            setEmail(userDetails.email);
        }
    }, [dispatch, userLogin, history]);

    useEffect(() => {
        console.log("watching updateMessage")
        if (userUpdate && Object.keys(userUpdate).length > 0) {
            if (userUpdate.email !== email || userUpdate.summary !== summary) {
                console.log("Updated");
                setEmail(userUpdate.email);
                setSummary(userUpdate.summary);
                // show "successful update" message
                setUpdate(true);
                setTimeout(() => setUpdate(false), 3000);
            }
        }
    }, [userUpdate])

    // second useEffect to fetch user's stories (update email and password fields??)
    useEffect(() => {
        if (userDetails) {
            console.log('received userDetails');
            dispatch(getUserStories(userLogin.userInfo._id, userLogin.userInfo.token));
        }
    }, [userDetails]);

    const handleUpdate = (e) => {
        dispatch(updateUser(summary, email, userLogin.userInfo._id));
    };

    return (
        userDetails ? 
            (
            <Container>
                <div className="profile">
                    {update && <p className="font-small">Profile Updated!</p>}
                    <h2 className="profile__username font-large">{userDetails.username}</h2>
                    <div className="profile__details">
                        <div className="profile__picture__container">
                            <p className="font-small">Profile Picture</p>
                            <img className="profile__picture__img" alt="profile pic" src={userDetails.userImage}></img>
                        </div>
                        <div className="profile__summary__container">
                            <p className="font-small">Profile Summary</p>
                            <textarea className="profile__summary__text font-small" onChange={(e) => setSummary(e.target.value)} value={summary}>{summary}</textarea>
                        </div>
                    </div>
                    <div className="profile__credentials">
                        <div className="cred__email profile__credentials__container">
                            <label htmlFor="email" className="font-small">Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                id="email" 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                value={email}
                                />
                        </div>
                    </div>
                    <button 
                        className="btn btn--main font-medium" 
                        onClick={handleUpdate}
                    >
                        Change Information
                    </button>
                </div>
                <div className="profile__stories">
                    <h2 
                        className="font-large margin-vertical"
                        style={{display: "flex", alignItems: "center"}}
                    >
                        {userDetails.username}'s Stories 
                        <Link 
                            to="/story/edit"
                            className="btn font-medium"
                            style={{marginLeft: "4rem", backgroundColor: "#536DFE", color: "white", fontWeight: 400}}
                        >
                            Create New Story
                        </Link>
                    </h2>
                </div>
                <div className="cards" style={{marginBottom: "5rem"}}>
                    {userStories && userStories.stories && userStories.loading === false 
                        ? userStories.stories.map((story) => <StoryCard key={story._id} {...story}/>)
                        : null
                    }
                </div>
            </Container>
        ) : null
    )
};

export default ProfileScreen;