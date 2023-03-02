const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
  }
  type Medicine {
    _id: ID!
    name: String
    start: String
    amount: Int
    interval: String
    subInterval: String
    times: [String]
    isActive: Boolean
    userId: ID!
  }

  type Auth {
    token: ID!
    user: User
  }

  input MedicineInput {
    name: String
    start: String
    amount: Int
    interval: String
    subInterval: String
    times: [String]
  }

  type Query {
    me: User!
    medicine(medicineId: ID!): Medicine
    medicines: [Medicine]
    dailymeds: [Medicine]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addMedicine(medicine: MedicineInput!): Medicine
    updateMedicine(medicineId: ID!, medicine: MedicineInput!): Medicine
    toggleMedicine(medicineId: ID!): Medicine
  }
`;
module.exports = typeDefs;
