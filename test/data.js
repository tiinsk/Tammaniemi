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

const reservation1 = {
  _id: '56d0998f23dfbff0256e0001',
  title: 'Mökkivaraus',
  userId: user1._id,
  startDate: new Date(2016, 6, 5),
  endDate: new Date(2016, 6, 15),
};

const reservation2 = {
  _id: '56d0998f23dfbff0256e0002',
  title: 'Rapujuhlat',
  userId: user2._id,
  startDate: new Date(2016, 7, 5),
  endDate: new Date(2016, 7, 15),
};

export { user1, user2, post1, post2, reservation1, reservation2 };
