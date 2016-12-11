const utility = require('./utility');

export const user1 = {
  _id: '56d0998f23dfbff0256ec001',
  name: 'Teppo Testaaja',
  email: 'teppo@testaaja',
  password: 'testi1',
  deleted: false
};

export const user2 = {
  _id: '56d0998f23dfbff0256ec002',
  name: 'Terttu Testaaja',
  email: 'terttu@testaaja',
  password: 'testi2',
  deleted: false
};

export const admin = {
  _id: '56d0998f23dfbff0256ec003',
  name: 'Terttu Testaaja',
  email: 'terttu@testaaja',
  password: 'testi2',
  role: 'admin',
  deleted: false
};

export const deletedUser = {
  _id: '56d0998f23dfbff0256ec004',
  name: 'Terttu Testaaja',
  email: 'terttu@deleted',
  password: 'testi2',
  deleted: true
};

export const post1 = {
  title: 'New Post',
  userId: user1._id,
  content: 'Such awesome content. Much wow',
  _id: '56d0998f23dfbff0256ec015',
};

export const post2 = {
  title: 'New Post',
  userId: user2._id,
  content: 'Such awesome content. Much wow',
  _id: '56d0998f23dfbff0256ec016',
};

export const reservation1 = {
  _id: '56d0998f23dfbff0256e0001',
  title: 'Mökkivaraus',
  userId: user1._id,
  startDate: new Date(2016, 6, 5),
  endDate: new Date(2016, 6, 15),
};

export const reservation2 = {
  _id: '56d0998f23dfbff0256e0002',
  title: 'Rapujuhlat',
  userId: user2._id,
  startDate: new Date(2016, 7, 5),
  endDate: new Date(2016, 7, 15),
};

export const task1 = {
  _id: '56d0998f23dfbff0256e0003',
  title: 'New Task',
  userId: user1._id,
  category: 2,
  isDone: false
};

export const task2 = {
  _id: '56d0998f23dfbff0256e0004',
  title: 'New Task',
  userId: user2._id,
  category: 1,
  isDone: false
};

export const token1 = {
  _id: '56d0998f23dfbff0256e0005',
  token: utility.generateToken()
};

export const expiredToken = {
  _id: '56d0998f23dfbff0256e0006',
  token: utility.generateToken(),
  validUntil: (() => {
    const now = new Date();
    now.setHours(now.getHours() - 4);

    return now;
  })()
};

export const usedToken = {
  _id: '56d0998f23dfbff0256e0007',
  token: utility.generateToken(),
  active: false
};

