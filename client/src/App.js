import {BrowserRouter, Route} from 'react-router-dom'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";

import "./static/sass/main.scss";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Route path="/" component={LandingScreen} exact />
            <Route path="/home" component={HomeScreen} exact />
            <Route path="/profile" component={HomeScreen} exact />
            <Route path="/login" component={HomeScreen} exact />
            <Route path="/story" component={HomeScreen} exact />
            <Footer />
        </BrowserRouter>
    );
}

export default App;