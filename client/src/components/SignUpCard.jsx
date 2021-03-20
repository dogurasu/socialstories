import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet";
import { signup } from "../actions/userActions";

// const CredentialCard = ({history, location}) => {
const SignUpCard = (props) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [pwMismatch, setPwMismatch] = useState(false);

    const dispatch = useDispatch();
    const {history, location, setSignupStatus} = props;
    // console.log(setSignupStatus);

    const userSignup = useSelector(state => state.userSignup);
    const userLogin = useSelector(state => state.userLogin);
    // const {loading, error, userInfo} = userLogin;
    const {userInfo} = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    // utilize useEffect to check if logged in: redirect if so
    useEffect(() => {
        if (userSignup) {
            // console.log(userSignup.message);
            setSignupStatus(userSignup.message);
        }
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect, userSignup])

    const loginDispatcher = (e) => {
        e.preventDefault();
        if (passwordConfirm === password) {
            setPwMismatch(false);
            dispatch(signup(name, username, email, password));
        } else {
            setPwMismatch(true);
        }
    }

    return (
        <>
            <Helmet>
                <title>SocialStory - Sign Up</title>
            </Helmet>
            <div className="cred">
                <form action="" method="post" className="cred__form font-small" onSubmit={loginDispatcher}>
                    <h2 className="font-medium">Sign Up</h2>
                    <div className="cred__name">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="cred__username">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username" 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="cred__email">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="cred__password">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="cred__password">
                        <label htmlFor="password__confirm">Confirm Password</label>
                        <input 
                            type="password"
                            name="password__confirm"
                            id="password__confirm"
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required 
                        />
                    </div>
                    {pwMismatch ? <p className="flash__failure">Passwords don't match!</p> : null}
                    <button className="btn btn--login font-small" type="submit" value="Login">Sign Up</button>
                </form>
            </div>
        </>
    );
};

export default SignUpCard;