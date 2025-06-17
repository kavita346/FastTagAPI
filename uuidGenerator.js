const { v4: uuidv4 } = require('uuid');

exports.generateRequestUUID = () => {
  return uuidv4();
};
