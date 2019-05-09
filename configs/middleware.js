import morgan from 'morgan';
import bodyParser from 'body-parser';

export default (app) => {
    // setup morgan which gives us http request logging
    app.use(morgan('dev'));

    app.use(bodyParser.json());
    
    app.use(bodyParser.urlencoded({ extended: false }));

    // set our port
    app.set('port', process.env.PORT || 5000);
}