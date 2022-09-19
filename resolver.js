const { maincardlist, animals, categories } = require('./data')
const _ = require('lodash')
const { v4 } = require('uuid')
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
    },
    Animal: {
        category: (parent, args) => {
            return _.find(categories, (c) => c.id == parent.category)
        }
    },
    Mutation: {
        addAnimal: (parent, {
            image,
            title,
            rating,
            price,
            description,
            slug,
            stock,
            onSale,
            category,
        }) => {
            let newAnimal = {
                id: v4(),
                image,
                title,
                rating,
                price,
                description,
                slug,
                stock,
                onSale,
                category,
            }
            animals.push(newAnimal)
            return newAnimal
        }
    }
}

module.exports = resolver

// type Animal{
//     id: ID!
//     image: String!
//     title: String!
//     rating: Float
//     price: String!
//     description: [String!]!
//     slug: String!
//     stock: Int!
//     onSale: Boolean!
//     category: Category
// }