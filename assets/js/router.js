import React from 'react';
import {
  Link, BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import CommitListContainer from './containers/CommitListContainer';
import RepoCreateContainer from './containers/RepoCreateContainer';
import RepoLinksContainer from './containers/RepoLinksContainer';

export default (
  <Router>
    <div id="wrapper" className="toggled">
      <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
          <li className="sidebar-brand">
            <Link to="/home" style={{ borderBottom: '2px solid #999999' }}>Github Monitor</Link>
          </li>
          <RepoLinksContainer />
        </ul>
      </div>

      <div id="page-content-wrapper">
        <div className="container-fluid">
          <RepoCreateContainer />
          <Switch>
            <Route exact path="/home" component={CommitListContainer} />
            <Route
              path="/home/:repo"
              render={({ match }) => (
                <CommitListContainer repo={match.params.repo} />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  </Router>
);
