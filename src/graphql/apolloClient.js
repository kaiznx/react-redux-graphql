import {
  ApolloClient,
  createNetworkInterface,
  addTypename
} from 'react-apollo';
import config from '../config';

const networkInterface = createNetworkInterface({
  uri: `${config.API_URL}/graphql`
  // connectToDevTools: true
  // transportBatching: true
});

networkInterface.use([{
  applyMiddleware(req, next) {
    const token = localStorage.getItem('token');
    req.options.headers = {
      ...req.options.headers,
      authorization: token ? `Bearer ${token}` : null
    };
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
  queryTransformer: addTypename,
});

export default client;