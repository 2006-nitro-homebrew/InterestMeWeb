import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
// import PropTypes from "prop-types";
import {Login, InterestMe, Home} from './components'
import ReadingList from './components/ReadingList'
import SingleArticle from './components/SingleArticle'

export default class Routes extends React.Component {
  render() {
    // const { isLoggedIn } = this.props;
    const isLoggedIn = true // TESTING

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Login} />
        <Route exact path="/readinglist" component={ReadingList} />
        <Route exact path="/readinglist/:articleId" component={SingleArticle} />

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
