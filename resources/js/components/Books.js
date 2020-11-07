import React,{ Component } from 'react';
import BookList from './BookList';
import {GoTrashcan} from 'react-icons/go'

export default class Books extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookName : ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const itemName = e.target.name;
        const itemValue = e.target.value;

        this.setState({
            [itemName] : itemValue
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.addBookName(this.state.bookName);
        this.setState({bookName: ''})
    }


    render(){
        const {userName} = this.props;


        return (
            <>
            <div className="text-center mt-4">


                <br/>
                <div className="container mt-4">
                    <div className="row justify-content-center">
                        <div className="col-md-4 text-center">
                        <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control"
                                        name="bookName"
                                        type="text"
                                        value={this.state.bookName}
                                        onChange={this.handleChange}

                                    />
                                    <div className="input-group-append">
                                        <button
                                            type="submit"
                                            name="buttonAdd"
                                            className="btn btn-sm btn-info"
                                        > + Add</button>
                                        {/* <span className="input-group-text"> + Add</span> */}
                                    </div>
                                </div>
                            </form>


                            {this.props.books && this.props.books.length ? (
                                <h4 className="py-2">Your books</h4>
                            ): null}


                            <div className="list-group">
                                {this.props.books && this.props.books.length ? (
                                    <BookList 
                                        userID={this.props.userID}
                                        books={this.props.books} 
                                        
                                    />
                                ):null}

                                
                            </div>

                        </div>
                    </div>
                    <br/>

                </div>



            </div>
            </>
        );
    }
}
