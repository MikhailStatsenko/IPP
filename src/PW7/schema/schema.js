const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const CarType = new GraphQLObjectType({
    name: 'Car',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        price: { type: GraphQLString },
        age: { type: GraphQLString },
        brand: {
            type: BrandType,
            resolve (parent, args) {
                return _.find(brands, {id : parent.brandId })
            }
        }
    }),
});

const BrandType = new GraphQLObjectType({
    name: 'Brand',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return _.filter(cars, { brandId : parent.id });
            }
        }
    })
});

const cars = [
    { id: '1', title: 'Model S', price: '45000', age: '4', brandId: '1' },
    { id: '2', title: 'Model 3', price: '25000', age: '2', brandId: '1' },
    { id: '3', title: 'Model X', price: '55000', age: '3', brandId: '1' },
    { id: '4', title: 'Model Y', price: '35000', age: '1', brandId: '1' },
    { id: '5', title: 'C-Class', price: '40000', age: '2', brandId: '2' },
    { id: '6', title: 'E-Class', price: '45000', age: '1', brandId: '2' },
    { id: '7', title: 'S-Class', price: '60000', age: '3', brandId: '2' }
];

const brands = [
    { id: '1', name: 'Tesla' },
    { id: '2', name: ' Mercedes ' },
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: CarType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(cars, { id: args.id });
            }
        },
        cars: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return cars;
            }
        },
        brand: {
            type: BrandType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(brands, { id: args.id });
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return brands;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCar: {
            type: CarType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: GraphQLString },
                age: { type: GraphQLString },
                brandId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const car = {
                    id: _.uniqueId(2),
                    title: args.title,
                    price: args.price,
                    age: args.age,
                    brandId: args.brandId
                };
                cars.push(car);
                return car;
            }
        },
        updateCar: {
            type: CarType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                price: { type: GraphQLString },
                age: { type: GraphQLString },
                brandId: { type: GraphQLID }
            },
            resolve(parent, args) {
                const car = _.find(cars, { id: args.id });
                if (!car) {
                    throw new Error('Машина с указанным ID не найдена');
                }

                if (args.title) {
                    car.title = args.title;
                }
                if (args.price) {
                    car.price = args.price;
                }
                if (args.age) {
                    car.age = args.age;
                }
                if (args.brandId) {
                    car.brandId = args.brandId;
                }

                return car;
            }
        },
        deleteCar: {
            type: CarType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const carIndex = _.findIndex(cars, { id: args.id });
                if (carIndex === -1) {
                    throw new Error('Машина с указанным ID не найдена');
                }

                const deletedCar = cars.splice(carIndex, 1)[0];
                return deletedCar;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});