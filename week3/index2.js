const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

// middleware for json
app.use(express.json());

// first of all we need to connect mongodb 
mongoose.connect('mongodb://localhost:27017/mudakkir', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('mongodb connected locally')).catch((err) => console.log(`Error Occurred`, err));

// now create schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = new mongoose.model('User',userSchema);

//user post route
app.post('/users',async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            age: req.body.age
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/users',async (req,res)=> {
    try {
      const users = await User.find();
      res.json(users);  
    } catch (err) {
        res.status(500).json({error : err.message});
    }
});

app.put('/users/:name',async (req , res ) => {
    try {
       const updateUser = await User.updateOne(
        {name: req.params.name},
        {$set : {age: req.body.age}}
       ) ;
       res.json(updateUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.delete('/users/:name',async (req, res) => {
    try {
        const deleteUser = await User.deleteOne({name: req.params.name});
        res.json(deleteUser);
    } catch (err) {
        res.status(500).json({error : err.message});
    }
});

app.listen(port, ()=> {
    console.log('Server running on port 3000');
})