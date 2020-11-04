import React,{ Component } from 'react';
export default class BookList extends Component{
  render(){
        const {books} = this.props;
        const myBooks = books.map((item) => {
            return(
                <li className="list-group-item" key={item.bookID}>
                    {item.bookName}
                </li>
            )
        })

        return (
            <>

                {myBooks}

            </>
        );
    }
}
