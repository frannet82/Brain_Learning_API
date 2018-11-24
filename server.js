const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()

        }
    ]
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
            res.json('signing');
        } else{
            res.status(400).json('error logging in');
        }

});

app.post('/register',(req,res)=>{
    const {email, password, name} = req.body;
    database.users.push({

            id: '125',
            name: name,
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

app.listen(3000, () => {
    console.log("App is running on port 3000")
});