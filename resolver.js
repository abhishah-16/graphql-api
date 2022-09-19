const { maincardlist, animals, categories } = require('./data')
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
    }
}

module.exports = resolver