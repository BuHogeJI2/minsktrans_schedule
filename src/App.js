import React from "react";
import Main from "./components/Main";
import {Provider} from "react-redux";
import store from "./bll/store";

function App() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
}

export default App;
