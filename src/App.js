import React from 'react';
import './App.css';
import Main from "../src/main/component/Main"
import {Route, BrowserRouter} from 'react-router-dom';
import Place from "./place/component/Place";


function App() {
    return (
        <div className="App">
            <div className="Main">
                <BrowserRouter>
                    <Route exact path={"/"} component={Main}/>
                    <Route exact path={"/place"} component={Place}/>
                </BrowserRouter>
            </div>
        </div>
    );
}


export default App;