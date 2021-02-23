import React, { Component } from "react";
import axios from "axios";

export default class BranchDetails extends Component {
    state = {
        commitMessage: '',
        timeStamp: '',
        filesChanged: 0,
        authorName: '',
        authorEmail: ''
    }
    goBack() {
        window.history.back();
    }
    componentDidMount() {
        axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/commits/" 
            + this.props.match.params.id)
            .then((response) => {
                let data = response.data;
                let commitMessage = data.commit.message;
                let timeStamp = data.commit.author.date;
                let filesChanged = data.files.length;
                let authorName = data.commit.author.name;
                let authorEmail = data.commit.author.email;
                this.setState({ 
                    commitMessage: commitMessage,
                    timeStamp: timeStamp,
                    filesChanged: filesChanged,
                    authorName: authorName,
                    authorEmail: authorEmail
                });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div className="container">
                <h2>Commit Details</h2>
                <p>Author: {this.state.authorName}</p>
                <p>Author E-mail: {this.state.authorEmail}</p>
                <p>Files Changed: {this.state.filesChanged}</p>
                <p>Date: {this.state.timeStamp}</p>
                <p>Commit Message: {this.state.commitMessage}</p>
                <button className='btn btn-dark' onClick={this.goBack}>Back</button>
            </div>
        );
    }
}
