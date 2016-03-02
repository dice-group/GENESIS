import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// app wrapper
import App from './app';

// routes
import routes from './routes';

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            {routes}
        </Route>
    </Router>
), document.getElementById('container'));
