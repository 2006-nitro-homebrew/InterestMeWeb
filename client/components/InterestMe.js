import React from 'react'
import { connect } from 'react-redux'
import { fetchArticles } from '../store/articles'
import { fetchAddArticle } from '../store/addArticle'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { fetchRecs,fetchDefaultRecs } from '../store/recs'

class InterestMe extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        let random = Math.floor(Math.random() * Math.floor(150));
        // console.log(random)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(user.uid)
                    .collection('savedOffline')
                    .where("random", '<', random)
                    .orderBy("random", "desc")
                    .limit(1)
                    .onSnapshot(snapshot => {
                        const data = snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }))
                        console.log(data[0])
                        if (data.length>0) {
                            this.props.getRecs(data[0].keywords[0], data[0].keywords[1], data[0].keywords[2])
                        }
                        else {
                            firebase
                                .firestore()
                                .collection('users')
                                .doc(user.uid)
                                .collection('savedOffline')
                                .where("random", '>', random)
                                .orderBy("random")
                                .limit(1)
                                .onSnapshot(snapshot2 => {
                                    const data2 = snapshot2.docs.map(doc => ({
                                        id: doc.id,
                                        ...doc.data()
                                    }))
                                if (data2.length>0) {
                                    this.props.getRecs(data2[0].keywords[0], data2[0].keywords[1], data2[0].keywords[2])
                                }
                                else{
                                    this.props.getDefaultRecs()
                                }
                            })
                        }
                    })
            } else {
                console.log()
            }
        })
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
        getRecs: (kw1, kw2, kw3) => dispatch(fetchRecs(kw1, kw2, kw3)),
        getDefaultRecs: () => dispatch(fetchDefaultRecs())
    }
}

export default connect(mapState, mapDispatch)(InterestMe)
