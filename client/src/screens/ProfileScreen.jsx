import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "../components/Container";
import { 
    getSingleUser,
    updateUser,
} from "../actions/userActions";

const ProfileScreen = (props) => {
    const [email, setEmail] = useState('');
    const [summary, setSummary] = useState('');
    // const [password, setPassword] = useState('');
    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails).userDetails;
    const userUpdate = useSelector(state => state.userUpdate);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('render');
    })

    // initial render, get single user
    useEffect(() => {
        // console.log(userLogin);
        if (userLogin.userInfo) {
            dispatch(getSingleUser(userLogin.userInfo._id));
        }
    }, [dispatch, userLogin]);

    // second useEffect to update email and password fields
    useEffect(() => {
        console.log("second useEffect");
        if (userDetails) {
            setEmail(userDetails.email);
            setSummary(userDetails.summary);
        }
    }, [userDetails]);

    useEffect(() => {
        console.log("watching updateMessage")
        setEmail(userUpdate.email);
        setSummary(userUpdate.summary);
    }, [userUpdate])

    const handleUpdate = (e) => {
        dispatch(updateUser(summary, email, userLogin.userInfo._id));
    };

    return (
        userDetails ? 
            (
            <Container>
                <div className="profile">
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
                        {/* <div className="cred__password profile__credentials__container">
                            <label htmlFor="password" className="font-small">Password</label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                value={password}
                            />
                        </div> */}
                    </div>
                    <button 
                        className="btn btn--main font-medium" 
                        onClick={handleUpdate}
                    >
                        Change Information
                    </button>
                </div>
            </Container>
        ) : null
    )
};

export default ProfileScreen;