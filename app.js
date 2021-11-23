require('dotenv').config()
const express = require('express')
const { ApolloServer,gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')
const mongoose = require('mongoose')
const Employee = require('./models/employee')

const typeDefs = gql`
  type Employee {
    firstName: String!,
    lastName: String!,
    email:String!
  }

  type Query {
    employees: [Employee]
  }

  type Mutation {
      createEmployee (firstName:String!,lastName:String!,email:String!): Employee
  }
`
const resolvers = {
  Query: {
    employees: async (parent, args) => {
      const employees = await Employee.find();

      return [...employees]
    }
  },
  Mutation: {
    createEmployee:async (parent, args) => {

      const { firstName, lastName, email } = args

      const employeeObj = new Employee({
        firstName,
        lastName,
        email
      })

      const employee = await employeeObj.save()

      return employee
    }
  }
};

async function startApolloServer (typeDefs, resolvers) {
  try {
    const app = express()

    app.get('/', function (req, res) {
      res.sendFile('views/index.html', { root: __dirname })
    })

    await mongoose.connect(`mongodb://${process.env.DB_HOST}:27017`, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD
    })

    const httpServer = http.createServer(app)
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()
    server.applyMiddleware({ app })
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve))
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  } catch (error) {
    console.log('Error: Server failed to start', error)
  }
}

startApolloServer(typeDefs, resolvers)

