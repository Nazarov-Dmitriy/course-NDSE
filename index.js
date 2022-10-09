const express = require('express')
const rooter = require('./routes/routes')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')

mongoose.Promise = global.Promise;

const UrlDB = process.env.ME_CONFIG_MONGODB_URL
const DATABESE = process.env.ME_CONFIG_MONGODB_DATABASEE
const PORT = process.env.PORT || 7070



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.set('view engine', 'ejs')
app.use(session({
    secret: 'SECRET'
}));

app.use(passport.initialize())
app.use(passport.session())



app.use('/', rooter)

// const PORT = process.env.PORT || 7070
// app.listen(PORT, () => {
//     console.log(`Server listener  on port ${PORT}`);
// })

app.listen(PORT, async () => {
    try {
        console.log(`Server listener  on port ${PORT}`);
        await mongoose.connect('mongodb://root:example@mongo:27017/users?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Database connected')
        }, error => {
            console.log('Database cant be connected: ' + error)
        })

    } catch (e) {
        console.log(e);
    }
});