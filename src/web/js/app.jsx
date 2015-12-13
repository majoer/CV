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
    return <div className="content">
          {this.props.children}
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

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
