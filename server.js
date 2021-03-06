const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
var cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            firstname: 'john',
            lastname: 'talavi',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            firstname: 'sally',
            lastname: 'bonner',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()

        }
    ],
    Login:[{
        id: '987',
        hash: ' ',
        email: 'john@gmail.com'

    }]
}


app.get('/', (req,res) => {
    res.send('This is working');
});


app.get('/profile/:id',(req,res)=>{
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id)
            return res.json(user);
    });
    return  res.status(404).json('no such user');
});


app.post('/signin',(req,res)=>{
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password)
        {
            res.json('success');
        } else{
            res.status(400).json('error logging in');
        }

});

app.post('/register',(req,res)=>{
    const {email, password, firstname, lastname} = req.body;
    database.users.push({

            id: '125',
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            entries: '',
            joined: new Date()

    })
    res.json(database.users[database.users.length-1]);

});

app.put('/image', (req,res)=>{
    const { id } = req.body;
    database.users.forEach(user => {
        if (user.id === id){
            user.entries++;
            return res.json(user.entries);
        }
            
    });
    return  res.status(404).json('Invalid Request');
})

/*

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
*/

app.listen(3000, () => {
    console.log("App is running on port 3000")
});