import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router ,Switch, Route, BrowserRouter} from "react-router-dom"

const Root = () => {
    return (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App} exact={true}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
        </Switch>
    </BrowserRouter>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
