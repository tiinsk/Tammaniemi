const user1 = {
  _id: '56d0998f23dfbff0256ec001',
  name: 'Teppo Testaaja',
  email: 'teppo@testaaja',
  password: 'testi1',
};

const user2 = {
  _id: '56d0998f23dfbff0256ec002',
  name: 'Terttu Testaaja',
  email: 'terttu@testaaja',
  password: 'testi2',
};

const post1 = {
  title: 'New Post',
  userId: user1._id,
  content: 'Such awesome content. Much wow',
};

const post2 = {
  title: 'New Post',
  userId: user2._id,
  content: 'Such awesome content. Much wow',
};

export { user1, user2, post1, post2 };
