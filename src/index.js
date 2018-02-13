import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import * as actionTypes from "./store/actions/actionTypes";
// import joinReducer from "../src/store/reducers/Join";
import authReducer from "../src/store/reducers/Auth";
import loginReducer from "./store/reducers/Login";
import registerReducer from "./store/reducers/Register";
import logoutReducer from "./store/reducers/Logout";
import registerServiceWorker from './registerServiceWorker';
// import {loadState, saveState} from "./js/localStorage";

// const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const rootReducer =  combineReducers({
//     Register:registerReducer,
//     Login:loginReducer,
//     Auth:authReducer,
//     Logout:logoutReducer
// });

//-----------
const appReducer = combineReducers({
    /* your app’s top-level reducers */
    Register:registerReducer,
    Login:loginReducer,
    Auth:authReducer,
    Logout:logoutReducer
  })
  
  const rootReducer = (state, action) => {
    if (action.type === actionTypes.ON_LOGOUT_SUCCESS) {
      state = undefined
    }
  
    return appReducer(state, action)
  }
//-----------


const store = createStore(rootReducer ,
    composeEnhancers(
        applyMiddleware(thunk)
    ));

    

const app=(
   <Provider store={store}>
        <BrowserRouter>
           <App/>
        </BrowserRouter>
   </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
