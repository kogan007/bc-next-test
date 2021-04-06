import { ApolloProvider } from '@apollo/client/react'
import { useApollo } from '../lib/apollo/apolloClient'


const MyApp = ({ Component, pageProps }) => {
  
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={ apolloClient }>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp