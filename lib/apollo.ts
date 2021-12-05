import { IncomingMessage, ServerResponse } from 'http'
import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GITHUB_AUTH_TOKEN}`,
    }
  }
});

function createApolloClient() {

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  initialState: any = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
