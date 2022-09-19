const { ApolloServer, gql } = require('apollo-server')
const { maincardlist, animals, categories } = require('./data')
const _ = require('lodash')

const typeDefs = gql`
    type MainCard{
        title: String
        image: String
    }
    type Animal{
        id: ID!
        image: String!
        title: String!
        rating: Float
        price: String!
        description: [String!]!
        slug: String!
        stock: Int!
        onSale: Boolean!
        category: Category!
    }
    type Category{
        id: ID!
        image: String!
        category: String!
        slug: String!
        animals:[Animal!]!
    }
    type Query{
        maincards: [MainCard]!
        animals: [Animal!]!
        animal(slug:String!): Animal!
        categories: [Category]!
        category(slug: String!): Category!
    }
`
const resolver = {
    Query: {
        maincards: () => {
            return maincardlist
        },
        animals: () => {
            return animals
        },
        animal: (parent, args) => {
            const slug = args.slug
            const animal = _.find(animals, { slug })
            return animal
        },
        categories: () => {
            return categories
        },
        category: (parent, args) => {
            const slug = args.slug
            const category = _.find(categories, { slug })
            return category
        }
    },
    Category: {
        animals: (parent, args) => {
            return _.filter(animals, (animal) => animal.category == parent.id)
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers: resolver })
server.listen(5000).then(({ url }) => {
    console.log(`SERVER IS RUNNING AT ${url} :)`);
})
