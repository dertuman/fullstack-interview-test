import React, { Component } from "react";
import { Octokit } from "@octokit/core";
import styles from './CreatePullRequest.module.css';
import axios from "axios";

const generatePullRequestAndMerge = async() => {
    // First octokit instance used to make the pull requests
    const octokitCreatePullRequest = new Octokit({ auth: '4e8f7f0063a502dfdbddcb5ee580d5a2cee616bd' }),
        owner = 'dertuman',
        repo = 'fullstack-interview-test',
        title = document.getElementById('title').value,
        body  = document.getElementById('description').value,
        base  = document.getElementById('selectedBase').value,
        head  = document.getElementById('selectedHead').value;

    // Second octokit instance used to merge the pull requests if need be
    const octokitMergePullRequest = new Octokit({ auth: '4e8f7f0063a502dfdbddcb5ee580d5a2cee616bd' }),
        owner2 = 'dertuman',
        repo2 = 'fullstack-interview-test';

    await octokitCreatePullRequest.request(
        `POST /repos/{owner}/{repo}/pulls`, { owner, repo, title, body, head, base },
        ).then(response => {
            if (response.status === 201) {
                alert('Pull Request Sent Succesfully');
            }
            // If the merge option is selected
            if (document.querySelector('input[name="saveOrMerge"]:checked').value === 'merge') {
                axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/pulls?state=all")
                    .then((response) => {
                        octokitMergePullRequest.request(
                            `PUT /repos/{owner2}/{repo2}/pulls/`+response.data.length+`/merge`, {owner2, repo2}
                        ).then(response => {
                            alert(response.data.message);
                        }).catch(error => {
                            alert(error);
                            console.log(error);
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                });
            }
        }).catch(error => {
            alert(error);
        });
    
}

export default class CreatePullRequest extends Component {
    state = {
        branches: [],
        selectedBase: '',
        selectedHead: '',
    }

    componentDidMount() {
        axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/branches")
            .then((response) => {
                this.setState({ branches: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getSelectedBase = (e) => {
        this.setState({selectedBase: e.target.value});
    }

    getSelectedHead = (e) => {
        this.setState({selectedHead: e.target.value});
    }

    render() {
        return (
            <div className="container">
                <h2 className={styles.Title}>Create a Pull Request</h2>
                <div id="pullRequestData">
                    <div className={styles.pullRequestInnerContainer}>
                        <p>Base</p>
                        <select onChange={this.getSelectedBase} value={this.state.selectedBase} id="selectedBase">
                            {this.state.branches.map((branch,index) => {
                                return <option key={index} value={branch.name}>{branch.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.pullRequestInnerContainer}>
                        <p>Compare</p>
                        <select onChange={this.getSelectedHead} value={this.state.selectedHead} id="selectedHead">
                            {this.state.branches.map((branch,index) => {
                                return <option key={index} value={branch.name}>{branch.name}</option>
                            })}
                        </select>
                    </div>
                    <div className={styles.pullRequestInnerContainer}>
                        <p>Please provide a title</p>
                        <input type="text" id="title"></input>
                    </div>
                    <div className={styles.pullRequestInnerContainer}>
                        <p>Please provide a description</p>
                        <textarea id="description"></textarea>
                    </div>
                    <div className={styles.pullRequestInnerContainer}>
                        <p>Would you like to save this pull request or merge these branches?</p>
                        <label>Save
                            <input type='radio' value='save' name='saveOrMerge' defaultChecked></input>
                        </label>
                        <label>Merge
                            <input type='radio' value='merge' name='saveOrMerge'></input>
                        </label>
                    </div>
                    <div className={styles.pullRequestInnerContainer}>
                        <button className='btn btn-dark' onClick={generatePullRequestAndMerge}>Create Pull Request</button>
                    </div>
                </div>
            </div>
        );
    }
}
