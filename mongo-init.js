// mongo-init.js
db = db.getSiblingDB('todo');

db.createUser({
    user: 'root',
    pwd: 'password',
    roles: [{ role: 'readWrite', db: 'todo' }],
});
