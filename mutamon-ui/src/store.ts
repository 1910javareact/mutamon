import { compose, applyMiddleware, Store, createStore } from "redux"
import logger from "redux-logger"
import reduxThunk from "redux-thunk"
import { state } from "./reducers"

const a:any = window

//if they have dev tools installed let them be used otherwise use the default chrome
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, logger)//exists in dispatch step
)

//this will be the store that we use to give data ot our components
export const store: Store<any> = createStore(
    state,
    enhancer
)