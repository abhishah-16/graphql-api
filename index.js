const { ApolloServer, gql } = require('apollo-server')
const typeDefs = require('./schema')
const resolver = require('./resolver')
const { maincardlist, animals, categories } = require('./data')


const server = new ApolloServer({ typeDefs, resolvers: resolver })
server.listen(5000).then(({ url }) => {
    console.log(`SERVER IS RUNNING AT ${url} :)`);
})
