import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import messenger from './src/controllers/createMessage';
import { Settings } from './settings';

const app = express();

// instance of our class
let messages = new messenger(Settings.PORT);

const dataConnection = (user: string, pass: string): string => {
    return `mongodb://${user}:${pass}@ds151232.mlab.com:51232/linkedin_test`
}

let database = dataConnection(Settings.mlabUser, Settings.mlabPass);


// mongoose connection
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// generics
function nameCreator<T>(name: T): T {
    return name;
}

let myName = nameCreator<string>('Manny,');

// declaration merging
interface Warriors {
    weapon: string;
    skills: number;
}

interface Warriors {
    name: string;
}

let ninja: Warriors = {weapon: "Shuriken", skills: 5, name: "Manny"};

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(ninja)
);

app.listen(Settings.PORT, () =>
    console.log(myName,messages.messagePrint())
);