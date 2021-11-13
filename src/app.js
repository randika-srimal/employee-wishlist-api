const express = require('express')
const { ApolloServer,gql } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')

const typeDefs = gql`
  type Employee {
    name: String!,
    email:String
  }

  type Query {
    employees: [Employee]
  }
`

const employees = [
    {
        name:'Normal Randika'
    },
    {
        name:'Genius Randika'
    },
    {
        name:'Brave Randika'
    },
    {
        name:'Cute Randika'
    }
]

const resolvers = {
  Query: {
    employees: () => employees,
  },
};



async function startApolloServer (typeDefs, resolvers) {
  try {
    const app = express()

    app.get('/', function (req, res) {
      res.sendFile('views/index.html', { root: __dirname })
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

