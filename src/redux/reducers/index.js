import { combineReducers } from 'redux';
import apolloClient from '../../graphql/apolloClient';
import session from './session';

const appReducers = {
  session
}

const reducers = combineReducers({
  ...appReducers,
  apollo: apolloClient.reducer()
});

export default reducers;