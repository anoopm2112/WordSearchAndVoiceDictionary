import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { logger } from 'redux-logger';

import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware, logger)
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);

export { store };