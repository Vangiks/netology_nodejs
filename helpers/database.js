const { createReadStream, writeFile } = require('fs');

function read(path) {
  return new Promise((resolve, reject) => {
    let data = '';
    const reader = createReadStream(path);
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
      return writeFile(databasePath, JSON.stringify(database), (error) => {
        if (error) throw new Error(error);
      });
    })
    .then(() => record)
    .catch((error) => {
      console.error(error);
      return false;
    });
}

function deleteRecord(databasePath, table, id) {
  return readDatabase(databasePath)
    .then((database) => {
      database[table] = database[table].filter((record) => record.id !== id);
      return writeFile(databasePath, JSON.stringify(database), (error) => {
        if (error) throw new Error(error);
      });
    })
    .then(() => true)
    .catch((error) => {
      console.error(error);
      return false;
    });
}

function updateRecord(databasePath, table, id, data) {
  let newRecord = null;
  return readDatabase(databasePath)
    .then((database) => {
      const index = database[table].findIndex((record) => record.id === id);
      newRecord = { ...database[table][index], ...data, id };
      database[table][index] = newRecord;
      return writeFile(databasePath, JSON.stringify(database), (error) => {
        if (error) throw new Error(error);
      });
    })
    .then(() => newRecord)
    .catch((error) => {
      console.error(error);
      return false;
    });
}

module.exports = {
  readDatabase,
  readTable,
  read,
  AddRecord,
  deleteRecord,
  updateRecord,
};
