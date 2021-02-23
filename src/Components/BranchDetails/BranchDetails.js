import React, { Component } from "react";
import styles from './BranchDetails.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";

export default class BranchDetails extends Component {
    state = {
        commits: [],
    }
    
    goBack() {
        window.history.back();
    }

    // Using axios to get all the commits of the selected branch, using the sha identifier
    componentDidMount() {
        axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/commits?sha=" 
            + this.props.match.params.id)
            .then((response) => {
                this.setState({ commits: response.data });
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
                <div className="container">
                    <h2>Branch Details</h2>
                    <h4>Branch Name:</h4>
                    <p>{this.props.match.params.name}</p>
                    <h4>Commits:</h4>
                    {/* Loop through all commits and create the lynks to the commit details dynamically */}
                    {this.state.commits.map((commit, index) => {
                        return (
                            <Link to={"/commit-details/"+commit.sha} key={index}>
                                <div className={styles.Commit}>
                                    <p>Author: {commit.commit.author.name}</p>
                                    <p>Date: {commit.commit.author.date}</p>
                                    <p>Message: {commit.commit.message}</p>
                                </div>
                            </Link>
                        )
                    })}
                    <button className='btn btn-dark' onClick={this.goBack}>Back</button>
                </div>
        );
    }
}
