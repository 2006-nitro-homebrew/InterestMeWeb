import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'

// import PropTypes from "prop-types";
import {Login, Home, Signup} from './components'

import ReadingList from './components/ReadingList'
import SingleArticle from './components/SingleArticle'
import AddArticle from './components/AddArticle'
import InterestMe from './components/InterestMe'

export default class Routes extends React.Component {
  render() {
    // const { isLoggedIn } = this.props;
    const isLoggedIn = true // TESTING

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/interestMe" component={InterestMe} articleCount={3} /> */}
        <Route
          path="/interestMe"
          render={() => <InterestMe articleCount={20} />}
        />
        <Route exact path="/readinglist" component={ReadingList} />
        <Route exact path="/readinglist/:articleId" component={SingleArticle} />
        <Route exact path="/addarticle" component={AddArticle} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/" component={Home} /> */}
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
      </Switch>
    )
  }
}
