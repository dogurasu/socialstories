import { useState, useEffect } from 'react';
import Container from "../components/Container";
import LoginCard from "../components/LoginCard";
import SignUpCard from "../components/SignUpCard";

const LoginScreen = (props) => {
    const [showLogin, setShowLogin] = useState(true);
    const [signupStatus, setSignupStatus] = useState('');

    const swapCred = (e) => {
        console.log(`swapped to ${!showLogin ? "login form" : "signup form"}`);
        setShowLogin(!showLogin);
    }

    useEffect(() => {
        if (signupStatus === "success") {
            console.log("signupStatus is 'suceess'")
            setShowLogin(true);
        } else if (signupStatus === "false") {
            // setShowLogin(false)
        }
    }, [signupStatus])

    const loginForm = (
        <>
            <LoginCard {...props} setSignupStatus={setSignupStatus} />
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
        <Container>
            {signupStatus === "success" ? <p className="flash__success font-small">Sign-Up Successful. Please login.</p> : null}
            {showLogin ? loginForm : signUpForm}
        </Container>
    )
};

export default LoginScreen;