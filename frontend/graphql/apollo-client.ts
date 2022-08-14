import { parseCookies } from 'nookies'
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, createHttpLink, gql } from '@apollo/client'
import { NextPageContext } from 'next';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql'
});

const CreateClient = (ctx: NextPageContext | null) => {
    let access_token: any;
    access_token = parseCookies().access_token
    if (!access_token) access_token = ctx?.req?.headers.cookie?.slice(13)

    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: access_token ? `Bearer ${access_token}` : "",
            }
        }
    });

    return new ApolloClient({
        ssrMode: true,
        cache: new InMemoryCache(),
        credentials: 'same-origin',
        link: authLink.concat(httpLink)
    });
};


export default CreateClient;


// const authLink = setContext((_, { headers }) => {
//     return {
//         headers: {
//             ...headers,
//             authorization: cookies.access_token ? `Bearer ${cookies.access_token}` : ""
//         }
//     }
// });


// export let client = new ApolloClient({
//     ssrMode: true,
//     cache: new InMemoryCache(),
//     credentials: 'same-origin',
//     link: authLink.concat(httpLink),
// })




//"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwic3ViIjo2LCJpYXQiOjE2NTgxNDI3MTcsImV4cCI6MTY1ODc0NzUxN30.y7FLDrfzzL58SElCMyb-IzVPi_7UtYAPzVfecvl50As",