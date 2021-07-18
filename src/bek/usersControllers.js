const { getUsers, addUsers } = require('./reposytory');

exports.usersController =async (req, res) => {
    if (req.method === 'POST') {
        let result = await addUsers('Lesha');;
        res.write(JSON.stringify({ succses: true }));
        res.end();
    } else {
        // getUsers((users) => {
        //     res.write(users);
        //     res.end();
        // })
        let users = await getUsers();
            res.write(JSON.stringify(users));
            res.end();
    }
}