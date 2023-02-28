const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  input MedicineInput {
    name: String
    start: String
    amount: Int
    interval: String
    subInterval: String
    times: [String]
  }

  type Query {
    medicine(medicineId: ID!): Medicine
    medicines: [Medicine]
  }

  type Mutation {
    addMedicine(medicine: MedicineInput!): Medicine
    updateMedicine(medicineId: ID!, medicine: MedicineInput!): Medicine
    toggleMedicine(medicineId: ID!): Medicine
  }
`;
module.exports = typeDefs;
