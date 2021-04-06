import { useMemo } from 'react'
import { ApolloClient, InMemoryCache, SchemaLink, HttpLink } from '@apollo/client'

let apolloClient

// This is mostly from next.js official repo on how best to integrate Next and Apollo
function createIsomorphLink() {
  // only if you need to do auth
  if (typeof window === 'undefined') {
    // return new SchemaLink({ schema }) 
    return null
  } 
  // This sets up the connection to your endpoint, will vary widely.
  else {
    return new HttpLink({
      uri: `https://allied-materials.mybigcommerce.com/graphql`,
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GQL_TOKEN}`
      }
    })
  }
}

// Function that leverages ApolloClient setup, you could just use this and skip the above function if you aren't doing any authenticated routes
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  })
}


export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

// This is goal, now we have a custom hook we can use to set up Apollo across our app. Make sure to export this!
export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}