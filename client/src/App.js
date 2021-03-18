import {BrowserRouter, Route} from 'react-router-dom';
import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";

import "./static/sass/main.scss";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Container>
                <Route path="/" component={LandingScreen} exact />
                <Route path="/home" component={HomeScreen} exact />
                <Route path="/profile" component={HomeScreen} exact />
                <Route path="/login" component={HomeScreen} exact />
                <Route path="/story" component={HomeScreen} exact />
            </Container>
        </BrowserRouter>
    );
}

export default App;