import {BrowserRouter, Route} from 'react-router-dom'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import StoryScreen from "./screens/StoryScreen.jsx";

import "./static/sass/main.scss";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Route path="/" component={LandingScreen} exact />
            <Route path="/stories" component={HomeScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/stories/:id" component={StoryScreen} exact />
            <Route path="/stories/create" component={HomeScreen} exact />
            <Footer />
        </BrowserRouter>
    );
}

export default App;