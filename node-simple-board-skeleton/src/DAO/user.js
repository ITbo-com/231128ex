const {runQuery}= require("../lib/database");


const getByUsername = async(username) =>{
    const sql = 'SELECT id, password, display_name AS displayName, is_active AS isActive, is_staff AS isStaff FROM users WHERE username = ?';
    var res = await runQuery(sql, [username]);
    return res[0];
};

const create = async (username, password, displayName) => {
    const sql = "INSERT INTO users VALUES (DEFAULT, ?, ?, ?, DEFAULT, DEFAULT, DEFAULT)";
    await runQuery(sql, [username, displayName, password]);
}

module.exports={
    getByUsername,
    create
};