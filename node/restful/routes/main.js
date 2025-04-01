const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
    {id: 1, name: 'User1'},
    {id: 2, name: 'User2'},
    {id: 3, name: 'User3'}
]

app.get('/Hello', (req, res) => {
    res.send('Hello World!!')
})

//requset x, response o
app.get('/api/users', (req, res) => {
    res.json({ok:true, users: users})
})

// query string, requset 0, response x
app.get('/api/users/user', (req, res) => {
    let user = "";
    const {id, name} = req.query;

    if(req.query.name == null) {
        user = users.filter(data => data.id == id);
    } else {
        user = users.filter(data => data.id == id && data.name == name)
    } 
    res.json({ok:false, users: user})
})

// query params(path parms), request 0, response 0
app.get('/api/users/:id', (req, res) => {
    let id = req.params.id

    const user = users.filter(data => data.id == id);
    res.json({ok:false, users: user})
})


//post, request body 0, response 0
app.post('/api/users/userBody', (req, res) => {
    const id = req.body.id;
    const user = users.filter(data => data.id == id);
    res.json({ok:false, users: user})
})

// post, request body 0, response 0
app.post('/api/users/add', (req, res) => {
    const {id, name} = req.body;
    const user = users.concat({id, name});
    res.json({ok:true, users: user})
})

//put, request body 0, response 0
app.put('/api/users/update', (req, res) => {
    const {id, name} = req.body;
    const user = users.map(data => {
        if (data.id == id) data.name = name;
        return {
            id: data.id,
            name: data.name
        }
    })
    res.json({ok:true, users: user})
})

//patch, request params & body 0, response 0
app.patch('/api/users/update/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    const user = users.map(data => {        
        if (data.id == id) data.name = name
        return {
            id: data.id,
            name: data.name
        }
    })
    res.json({ok:true, users: user})
})

//delete, request body 0, response 0
app.delete('/api/users/delete', (req, res) => {
    const {id} = req.body;
    const user = users.filter(data => data.id != id);
    res.json({ok:true, users: user})
})

module.exports = app;

