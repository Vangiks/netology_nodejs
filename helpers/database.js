const fs = require('fs');

function read(path) {
  return new Promise((resolve, reject) => {
    let data = '';
    const reader = fs.createReadStream(path);
    reader.on('data', (chunk) => {
      data += chunk;
    });
    reader.on('end', () => {
      resolve(JSON.parse(data));
    });
    reader.on('error', () => {
      reject(false);
    });
  })
    .then((file) => file)
    .catch((error) => error);
}

function readDatabase(databasePath) {
  return read(databasePath);
}

function readTable(databasePath, table) {
  return readDatabase(databasePath).then((database) => database[table]);
}

function AddRecord(databasePath, table, record) {
  return readDatabase(databasePath)
    .then((database) => {
      database[table].push(record);
      return fs.promises.writeFile(databasePath, JSON.stringify(database));
    })
    .then(() => record)
    .catch(() => false);
}

function deleteRecord(databasePath, table, id) {
  return readDatabase(databasePath)
    .then((database) => {
      database[table] = database[table].filter((record) => record.id !== id);
      return fs.promises.writeFile(databasePath, JSON.stringify(database));
    })
    .then(() => true)
    .catch(() => false);
}

function updateRecord(databasePath, table, id, record) {
  const newRecord = { ...record, id };
  return readDatabase(databasePath)
    .then((database) => {
      const index = database[table].findIndex((record) => record.id === id);
      database[table][index] = newRecord;
      return fs.promises.writeFile(databasePath, JSON.stringify(database));
    })
    .then(() => newRecord)
    .catch(() => false);
}

module.exports = {
  readDatabase,
  readTable,
  read,
  AddRecord,
  deleteRecord,
  updateRecord,
};
