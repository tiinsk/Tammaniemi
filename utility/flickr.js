module.exports = {
  constructPhotoUrl: ({farm, server, id, secret}) => `//farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`
};
