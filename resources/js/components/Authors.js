import React,{ Component } from 'react';
import firebase from './Firebase'
import AuthorsList from './AuthorsList';
import { GrUndo } from "react-icons/gr";


export default class Authors extends Component{
    constructor(props){
        super(props);

        this.state = {
            displayAuthors : [],
            searchQuery: '',

        }

        this.handleChange = this.handleChange.bind(this);
        this.resetQuery = this.resetQuery.bind(this);
    }

    componentDidMount(){
        const ref = firebase
        .database()
        .ref(`books/${this.props.userID}/${this.props.bookID}/authors`);

        ref.on('value', snapshot => {
            let authors = snapshot.val();
            let authorsList = [];
            for(let item in authors){
                authorsList.push({
                    authorID: item,
                    authorName: authors[item].authorName,
                    authorEmail: authors[item].authorEmail,
                    star : authors[item].star
                });

                this.setState({
                    displayAuthors: authorsList
                })
            }
        })
    }

    handleChange(e){
        const itemName  = e.target.name;
        const itemValue = e.target.value;

        this.setState({
            [itemName] : itemValue
        })
    }

    resetQuery(){
        this.setState({
            searchQuery : ''
        });
    }

    
    render(){

        const dataFilter = item => item.authorName
            .toLowerCase()
            .match(this.state.searchQuery.toLowerCase()) && true;

            const filteredAuthors =  this.state.displayAuthors.filter(dataFilter);
    return(
        <>
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h1 className="font-weight-light text-center">
                        Authors
                    </h1>
                </div>
            </div>

            <div className="input-group mb-3">

                <input
                    className="form-control"
                    name="searchQuery"
                    type="text"
                    placeholder="Search for a book name"
                    value={this.state.searchQuery}
                    onChange={this.handleChange}

                />
                <div className="input-group-append">
                   <button
                        className="btn btn-info btn-md"
                        onClick={() => this.resetQuery() }
                   >
                       <GrUndo />
                   </button>
                </div>

                                    
            </div>

            <AuthorsList 
                adminUser={this.props.adminUser}
                bookID={this.props.bookID}
                userID={this.props.userID} 
                authors={filteredAuthors}
            />
        </div>
        </>
        );
    }
}
