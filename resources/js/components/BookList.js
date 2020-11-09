import React, { Component } from 'react';
import firebase from './Firebase';
import { GoTrashcan } from 'react-icons/go';
import { FaLink, FaUser } from 'react-icons/fa';
import { navigate } from '@reach/router';





export default class BookList extends Component{
    constructor(props){
        super(props);

        
        this.deletingBook = this.deletingBook.bind(this);
    }

    deletingBook = (e, whichBook) => {
        e.preventDefault(); 
        const ref = firebase
            .database()
            .ref(`books/${this.props.userID}/${whichBook}`);
        ref.remove();
    };

  render(){
        const {books} = this.props;

        const myBooks = books.map((item) => {
            return(
                <div className="list-group-item d-flex" key={item.bookID}>
                    <section
                        className="btn-group align-self"
                        role="group"
                        arial-label="Book Options"
                    >
                        <button
                            className="btn btn-sm btn-outline-secondary"
                            title="Delete Book"
                            onClick={e => this.deletingBook(e, item.bookID)}
                        >
                            <GoTrashcan /> 
                        </button>&nbsp;

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            title="Check In"
                            onClick={ () => navigate(`/checkin/${this.props.userID}/${item.bookID}`) }
                        >
                            <FaLink />  
                        </button>&nbsp;

                        <button
                            className="btn btn-sm btn-outline-secondary"
                            title="Authors"
                            onClick={ () => navigate(`/authors/${this.props.userID}/${item.bookID}`) }
                        >
                            <FaUser />  
                        </button>&nbsp;
                        
                        {item.bookName}
                    </section>
                    
                </div>
            )
        })

        return (
            <>

                {myBooks}

            </>
        );
    }
}
