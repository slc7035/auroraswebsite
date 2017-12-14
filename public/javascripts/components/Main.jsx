'use strict';
import styles from '../../stylesheets/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Home from './Home.jsx';
import Services from './Services.jsx';
import Stylists from './Stylists.jsx';
import About from './About.jsx';
import { Router, Route, browserHistory } from 'react-router';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header click={this._changeContext} tabs={['home', 'services', 'stylists']} />
				<div className='page-wrap'>
					{this.props.children}
				</div>
        <Footer />
      </div>
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
		<Route component={Main}>
	    <Route path="/" component={Home} />
			<Route path="/services" component={Services} />
			<Route path="/stylists" component={Stylists} />
		</Route>
  </Router>
), document.getElementById('root'));
