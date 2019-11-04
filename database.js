const faker = require("faker");

const groupsCount = 55;
const usersCount = 505;

// https://blueprintjs.com/docs/#core/colors
const groupColors = [
  "vermilion", "rose", "violet", "indigo", "cobalt",
  "turquoise", "forest", "lime", "gold", "sepia",
];

// Create groups
const groups = Array.from(
  { length: groupsCount },
  (value, index) => ({
    id: index,
    name: faker.commerce.productName(),
    color: faker.helpers.randomize(groupColors),
    description: faker.lorem.sentences(),
  })
);

// Create users
const users = Array
  // We are going to use only a subset of this
  .from({ length: usersCount }, () => faker.helpers.contextualCard())
  .map((user, index) => ({
    id: index,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  }));

// Create many-to-many relationship
const links = [];
const linksLen = usersCount * Math.round(groupsCount / 3);
for (let i = 0; i < linksLen; i++) {
  const groupId = faker.random.number({ min: 0, max: groupsCount });
  const userId = faker.random.number({ min: 0, max: usersCount });
  // this is used to de-duplicate links easier
  const id2 = `${groupId}-${userId}`;
  if (!links.find((value) => (value.id2 === id2))) {
    links.push({ id: i, groupId, userId, id2 });
  }
}

module.exports = () => ({ groups, users, links });