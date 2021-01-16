import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Home';
import Result from './Result';

const App = class App extends Component {
    constructor(props){
        super(props);
        this.store = props.store;
    }
    render () {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/result">
                            <Result />
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

if (document.getElementById('main-app')) {
    ReactDOM.render(<App />, document.getElementById('main-app'));
}
