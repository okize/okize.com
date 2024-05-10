import express from 'express';
import http from 'node:http';
import path from 'node:path';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import { index } from './routes/index.mjs';

const app = express();

app.set('port', process.env.PORT || 3333);
app.set('views', path.join(import.meta.dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.static(path.join(import.meta.dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.get('/', index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('okize.com server listening on port ' + app.get('port'));
});
