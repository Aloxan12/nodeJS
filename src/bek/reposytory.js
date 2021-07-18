const fs = require("fs");
const {readJsonFromFile, writeJsonToFile} = require("./fs-utils");

// let users = [
//     {"id":1, "name":"Egor"},
//     {"name":"Sasha"},
//     {"id":3, "name":"Vlsd"},
//     {"id":4, "name":"Artem"}
//     ]

const getUsers = () => {
    return readJsonFromFile("db");
}

const addUsers = async(name) => {
    let users = await getUsers();
    users.push({ name: name });
    writeJsonToFile("db", users)
}

exports.getUsers = getUsers;
exports.addUsers = addUsers;