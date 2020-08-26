import React from "react";
import { connect } from "react-redux";
import { fetchArticle } from "../store/singleArticle";
import firebase from 'firebase';

export class SingleArticle extends React.Component {
  // constructor() {
  //   super();
  // }

  async componentDidMount() {
    const articleId = this.props.match.params.articleId;
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.props.getArticle(user.uid,articleId);
      }
      else {}
    })
    
  }

  render() {
    let article = this.props.article;

    return (
      // <div>
      //   {article.length > 0 ? (
      //     <div>
      //       <h1>{article.name}</h1>
      //       <h3>Source: {article.source}</h3>
      //       <h3>{article.content}</h3>
      //     </div>
      //   ) : (
      //     <h1>No Article</h1>
      //   )}
      // </div>

      <div>
        <h1>{article.name}</h1>
        <h3>Source: {article.source}</h3>
        <h3>{article.content}</h3>
      </div>
    );
  }
}

const mapState = (state) => {
  return { article: state.article };
};

const mapDispatch = (dispatch) => {
  return {
    getArticle: (uid, id) => dispatch(fetchArticle(uid, id)),
  };
};

export default connect(mapState, mapDispatch)(SingleArticle);
