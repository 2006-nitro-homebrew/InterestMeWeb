import React from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../store/articles'
import { fetchAddArticle } from '../store/addArticle'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { fetchRecs } from '../store/recs'

class InterestMe extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        let random = Math.floor(Math.random() * Math.floor(150));
        console.log(random)
        // firebase.auth().onAuthStateChanged((user) => {
        //     if (user) {
        //         firebase
        //         .firestore()
        //         .collection('users')
        //         .doc(user.uid)
        //         .collection('savedOffline')
        //         .where("random", '<', random)
        //         // .orderBy("")
        //         .limit(1)
        //         .get()
        //         .then(article => {
        //             console.log(article.exists)
        //             if (!article.exists) return;
        //             let data = article.data()
        //             console.log(data)
        //         })
                // this.props.getArticles(user.uid)
                // this.props.getRecs('trump', 'white', 'house')
        //     } else {
        //         console.log()
        //     }
        // })
        this.props.getRecs('trump', 'white', 'house')
    }

    handleClick(event, id) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.firestore().collection('users')
                    .doc(user.uid)
                    .collection('savedOffline')
                    .doc(id)
                    .delete()
            } else {
                console.log()
            }
        })
    }

    renderTableHeader() {
        let header = ['Saved List', 'Original Source', 'Keywords', 'Remove Article']
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    render() {
        let allRecs = this.props.recs
        console.log(allRecs)

        return (
            <div>
                {allRecs.map(article => (
                    <div key={article.title}>
                        <h1><a href={article.url}>{article.title}</a></h1>
                        <h3>{article.description}</h3>
                    </div>
                ))}
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        recs: state.recs,
        articles: state.articles,
        user: state.user,
    }
}

const mapDispatch = (dispatch) => {
    return {
        getArticles: (uid) => dispatch(fetchArticles(uid)),
        // addArticle: (id) => dispatch(fetchAddArticle(id)),
        getRecs: (kw1, kw2, kw3) => dispatch(fetchRecs(kw1, kw2, kw3))
    }
}

export default connect(mapState, mapDispatch)(InterestMe)
