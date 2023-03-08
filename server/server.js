const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const { authMiddleware } = require('./utils/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const webPush = require('web-push');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
// ###You can generate VAPID keys using the command:
// **./node_modules/.bin/web-push generate-vapid-keys**
webPush.setVapidDetails(
  'mailto: `http://localhost:3000/`',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post('/notifications/subscribe', (req, res) => {
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon,
  });
  webPush
    .sendNotification(req.body.subscription, payload)
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.status(200).json({ success: true });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
