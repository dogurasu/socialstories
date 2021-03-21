import { useState, useEffect } from 'react';
import Container from "../components/Container";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";

const LoginScreen = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [loginStatus, setLoginStatus] = useState('');
    const [signupStatus, setSignupStatus] = useState('');

    const swapCred = (e) => {
        // console.log(`swapped to ${!showLogin ? "login form" : "signup form"}`);
        setShowLogin(!showLogin);
    }

    useEffect(() => {
        // console.log('ran loginScreen useEffect again');
        if (loginStatus === "fail") {
            // console.log('in loginStatus===fail');
            setTimeout(() => {
                // console.log("setLoginStatus back to empty");
                setLoginStatus("")
            }, 2000);
        }
        if (signupStatus === "success") {
            // console.log("signupStatus is 'suceess'")
            setShowLogin(true);
            setTimeout(() => {
                setSignupStatus("");
            }, 5000)
        } else if (signupStatus === "fail") {
            // setShowLogin(false)
        }
    }, [signupStatus, loginStatus])

    const loginForm = (
        <>
            <LoginCard {...props} setLoginStatus={setLoginStatus} />
            <p className="login__switch font-small">
                Don't have an account? 
                <span className="login__switch login__span" onClick={swapCred}> Sign up</span>
            </p>
        </>
    );

    const signUpForm = (
        <>
            <SignUpCard {...props} setSignupStatus={setSignupStatus}/>
            <p className="login__switch font-small">
                Have an account? 
                <span className="login__switch login__span" onClick={swapCred}> Login</span>
            </p>
        </>
    )

    return (
        <Container additionalClass={"login__wrapper"}>
            {signupStatus === "success" ? <p className="flash__success font-small">Sign-Up Successful. Please login.</p> : null}
            {loginStatus === "fail" ? <p className="flash__success font-small">Login Unsuccessful. Incorrect Email or Password. Please try again.</p> : null}
            {showLogin ? loginForm : signUpForm}
        </Container>
    )
};

export default LoginScreen;