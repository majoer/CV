import React from 'react';
import ReactDOM from 'react-dom';
import Component from 'omniscient';
import observer from 'omnipotent/decorator/observer';
import {Router, Route, Link, IndexRoute} from 'react-router';
import immstruct from 'immstruct';
import ReactCV from './cv/cv.jsx'

const data = immstruct({
  cv: null
});

const App = React.createClass({
  render: function() {
    return <div className="navigation">
        <ul>
          <li>
            <Link to="/">Curriculum Vitae</Link>
          </li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>;
  }
});
const RouterReactCV = observer(data, {
  cursor: ['cv']
}, ReactCV);

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={RouterReactCV}/>
      <Route path="/reactcv" component={RouterReactCV}/>
    </Route>
  </Router>
), document.querySelector('#app'));
