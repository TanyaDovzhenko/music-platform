import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import CreateClient from '../graphql/apollo-client'
import Player from '../components/common/Player'

const apolloClient = CreateClient(null)

function MyApp({ Component, pageProps }: AppProps) {
  return <ApolloProvider client={apolloClient}>
    <Player />
    <Component {...pageProps} />
  </ApolloProvider>
}

export default MyApp