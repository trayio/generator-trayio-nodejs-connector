require('dotenv').config(); //Inject environment variables
const Falafel = require('@trayio/falafel');

new Falafel().wrap({ directory: __dirname + '/../', test: true });
