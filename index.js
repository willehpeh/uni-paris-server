module.exports = () => {

  const uuid = require('uuid');
  const faker = require('faker');
  const avatarGen = require('random-avatar-generator');
  const jwt = require('jsonwebtoken');

  const generator = new avatarGen.AvatarGenerator();

  const token = jwt.sign({ foo: 'bar' }, 'superSecretKey', { expiresIn: '24h' });

  console.log(token);

  const data = {
    users: [],
    posts: [],
    comments: [],
    auth: {
      token
    }
  };

  for (let i = 0; i < 5; i++) {
    data.users.push({
      id: uuid.v4(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      image: generator.generateRandomAvatar(),
      posts: [],
      comments: []
    });
  }

  for (let i = 0; i < 20; i++) {
    const rawTitle = faker.lorem.words(Math.floor(Math.random() * 10 + 1));
    const title = rawTitle.charAt(0).toUpperCase() + rawTitle.substr(1);
    const post = {
      id: uuid.v4(),
      userId: data.users[Math.floor(Math.random() * 5)].id,
      title,
      content: faker.lorem.paragraph(),
      comments: [],
      created: faker.date.between('2021-01-01', '2021-01-31')
    };
    data.posts.push(post);
    data.users.find(user => user.id === post.userId).posts.push(post.id);
  }

  for (let i = 0; i < 30; i++) {
    const comment = {
      id: uuid.v4(),
      userId: data.users[Math.floor(Math.random() * 5)].id,
      postId: data.posts[Math.floor(Math.random() * 20)].id,
      content: faker.lorem.sentence(),
      created: null
    };
    data.users.find(user => user.id === comment.userId).comments.push(comment.id);
    const post = data.posts.find(post => post.id === comment.postId);
    post.comments.push(comment.id);
    comment.created = faker.date.between(post.created, '2021-01-31');
    data.comments.push(comment);
  }

  return data;
}
