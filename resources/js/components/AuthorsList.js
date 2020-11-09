import React, { Component } from 'react';
import firebase from './Firebase';
import { GoTrashcan, GoStar } from 'react-icons/go';






export default class AuthorsList extends Component{
    constructor(props){
        super(props);

        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    deleteAuthor = (e, whichBook, whichAuthor) => {
        e.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase
        .database()
        .ref(`books/${adminUser}/${whichBook}/authors/${whichAuthor}`);
        ref.remove();
    };

    toggleStar = (e, star, whichBook, whichAuthor) => {
        e.preventDefault();
        const adminUser = this.props.adminUser
        const ref = firebase.database().ref(`books/${adminUser}/${whichBook}/authors/${whichAuthor}/star`);
        if(star === undefined){
            ref.set(true);
        } else {
            ref.set(!star)
        }
    }

  render(){

        const admin = this.props.adminUser === this.props.userID ? true : false
        const authors = this.props.authors;
        const myAuthors = authors.map((item) => {
            return(
                <div className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1" key={item.authorID}>
                    <div className="card">
                        
                            <div className={
                                'card-body px-3 py-2 d-flex align-items-center' +
                                (admin ? '' : 'justify-content-center')}>
                                
                                {admin && (
                                    <div className="btn-group pr-2">
                                        <button
                                                className="btn btn-sm btn-outline-secondary"
                                                title="Delete Author"
                                                onClick={
                                                    e => this.deleteAuthor(e, this.props.bookID, item.authorID)}
                                        >
                                            <GoTrashcan />
                                        </button>
                                        <button
                                                className={'btn btn-sm ' + (item.star ? 'btn-info' : 'btn-outline-secondary') }
                                                title="Give star rating"
                                                onClick={
                                                    e => this.toggleStar(e, item.star, this.props.bookID, item.authorID)}
                                        >
                                            <GoStar />
                                        </button>

                                        
                                    </div>
                                )}

                                <div>{item.authorName}</div>
                            </div>
                       
                    </div>
                </div>
                
            )
        })

        return (
            <>

                <div className="row">{myAuthors}</div>

            </>
        );
    }
}
