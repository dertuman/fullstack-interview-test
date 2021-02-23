import React, { Component } from "react";
import { Octokit } from "@octokit/core";
import styles from './PullRequestList.module.css';
import axios from "axios";

const closePullRequest = async(number) => {
    const octokit = new Octokit({ auth: '4e8f7f0063a502dfdbddcb5ee580d5a2cee616bd' }),
        owner = 'dertuman',
        repo = 'fullstack-interview-test',
        state = 'closed';

    await octokit.request(
        `PATCH /repos/{owner}/{repo}/pulls/`+number, { owner, repo, state },
        ).then(response => {
            if (response.status === 201) {
                alert('Pull Request Closed Succesfully');
            }
        }).catch(error => {
            alert(error);
        });
    
}

export default class CreatePullRequest extends Component {
    state = {
        pullRequests: [],
    }

    componentDidMount() {
        axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/pulls?state=all")
            .then((response) => {
                this.setState({ pullRequests: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <h2 className={styles.Title}>Pull Request List</h2>
                <table className={styles.Table}>
                    <thead>
                        <tr>
                            <td>Author</td>
                            <td>Title</td>
                            <td>Description</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pullRequests.map((pullRequest, index) => {
                            let closeButton = null;
                            if (pullRequest.state === 'open') {
                                closeButton = <button onClick={() => {closePullRequest(pullRequest.number)}}>Close</button>
                            }
                            return (
                                <tr key={index}>
                                    <td>{pullRequest.user.login}</td>
                                    <td>{pullRequest.title}</td>
                                    <td>{pullRequest.body}</td>
                                    <td>
                                        {pullRequest.state}
                                        {closeButton}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
