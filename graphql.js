import ApolloClient from 'apollo-client';
import {
  HttpLink
} from 'apollo-link-http';
import {
  ApolloLink
} from 'apollo-link';
import {
  InMemoryCache
} from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import {
  onError
} from 'apollo-link-error';
import {
  notification
} from 'antd';

const URI = '';
const httpLink = new HttpLink({
  uri: URI,
});
const errorLink = onError(({
  networkError,
  graphQLErrors
}) => {
  if (graphQLErrors) {
    notification.error({
      message: graphQLErrors[0].message,
    });
  }
  if (networkError) {
    //
  }
});
const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
client.$query = (...args) => {
  return client.query(...args).catch(handlerError);
};
const GET_MERCHANT = gql `
  query merchant($id: Int!) {
    merchant(id: $id) {
      id
    }
  }
`;
const GET_MERCHANT_LIST = gql `
  query merchants($limit: Int, $page: Int) {
    merchants(limit: $limit, page: $page) {
      id
    }
  }
`;

export function gerMerchantById(id) {
  return client.$query({
    query: GET_MERCHANT,
    variables: {
      id,
    },
  });
}
export function getMerchantList(page = 1, limit = 10) {
  return client.$query({
    query: GET_MERCHANT_LIST,
    variables: {
      page,
      limit,
    },
  });
}
// export function gerMerchantById() {
//   return client.$query({
//     query: B,
//   });
// }

function handlerError(err) {
  // console.log('err', err);
}

export default 'ExchangeRates;';
const as = gql `
  mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
    createReview(episode: $ep, review: $review) {
      stars
      commentary
    }
  }
`;