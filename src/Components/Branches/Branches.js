import React, { Component } from "react";
import styles from './Branches.module.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const Branch = props => (
    <tr>
        <td>{props.name}</td>
        <td>
            <Link to={"/branch-details/"+props.sha+'/'+props.name}>View Details</Link>
        </td>
    </tr>
)

export default class ExercisesList extends Component {
    state = {
        branches: []
    }

    // Using axios in this lifecycle hook to fetch the data from the api
    componentDidMount() {
        axios.get("https://api.github.com/repos/dertuman/fullstack-interview-test/branches")
            .then((response) => {
                this.setState({ branches: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <>
                <table className={styles.Table}>
                    <thead>
                        <tr>
                            <th>Branch</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.branches.map(branch => {
                            return <Branch 
                                key={branch.commit.sha}
                                name={branch.name}
                                sha={branch.commit.sha} />
                        })}
                    </tbody>
                </table>
            </>
        );
    }
}
