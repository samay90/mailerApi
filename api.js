const fs = require("fs");
const keys = fs.readFileSync('./apiKeys.json');
const jsonData = JSON.parse(keys);
const addKey = async (key)=>{
    jsonData.keys.push(key);
    fs.writeFileSync('./apiKeys.json', JSON.stringify(jsonData));
    console.log(key);
}
module.exports =  addKey