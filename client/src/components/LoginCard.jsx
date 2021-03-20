import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../actions/userActions";

// const CredentialCard = ({history, location}) => {
const LoginCard = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {history, location} = props;

    const userLogin = useSelector(state => state.userLogin);
    // const {loading, error, userInfo} = userLogin;
    const {userInfo} = userLogin;
    
    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }
    
    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }
    console.log(location.search);
    const redirect = location.search ? location.search.split('=')[1] : '/stories';

    // utilize useEffect to check if logged in: redirect if so
    useEffect(() => {
        if (userInfo && Object.keys(userInfo).length > 0) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const loginDispatcher = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <>
            <Helmet>
                <title>SocialStory - Login</title>
            </Helmet>
            <div className="cred">
                <form action="" method="post" className="cred__form font-small" onSubmit={loginDispatcher}>
                    <h2 className="font-medium">Login to your Account</h2>
                    <div className="cred__email">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            onChange={onEmailChange} 
                            required 
                        />
                    </div>
                    <div className="cred__password">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            name="password"
                            id="password"
                            onChange={onPasswordChange}
                            required 
                        />
                    </div>
                    <button className="btn btn--login font-small" type="submit" value="Login">Login</button>
                </form>
            </div>
        </>
    )
};

export default LoginCard;