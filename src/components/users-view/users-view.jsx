import React, { Component } from 'react';
import Axios from 'axios';
import M from 'materialize-css';
import LoadingComponent from '../loading/loading';
import { Link } from 'react-router-dom';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            usersLoaded: false
        }

        this.getUsers = this.getUsers.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.renderUsers = this.renderUsers.bind(this);
    }

    /**
     * Fetch all registered users
     */
    getUsers() {
        let getAllUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user';
        Axios.get(getAllUserUrl).then((result) => {

            if (result.data.statusCode === 200) {
                this.setState({
                    users: result.data.data,
                    usersLoaded: true
                })
            } else {
                return (
                    <div><h6>Server Error</h6></div>
                )
            }
        })
    }

    /**
     * Delete a particular user
     */
    deleteUser(userId) {

        let deleteUserUrl = process.env.REACT_APP_LILY_API_BASE_URL + 'api/user/' + userId;
        Axios.delete(deleteUserUrl).then((result) => {

            if (result.data.statusCode == 200) {
                this.setState({
                    usersLoaded: false
                })
                this.getUsers();

            } else {
                return (
                    <div><h6>Server Error</h6></div>
                )
            }
        })
    }

    /**
     * Render fetched users
     */
    renderUsers() {
        if (!this.state.usersLoaded) {
            return (
                <div className="Home">
                    <div className="container">
                        <LoadingComponent loaderStyle="spinner-layer spinner-blue-only" />
                    </div>
                </div>
            )
        } else {
            return (
                <ul className="collapsible popout">
                    {
                        this.state.users.map((user, i) => (
                            <li key={i}>
                                <div className="collapsible-header black-text">
                                    {user.firstname} {user.lastname}
                                    <a href="#!" onClick={() => { this.deleteUser(user.userId) }}><i className="material-icons right grey-text !important">delete</i></a>
                                </div>
                                <div className="collapsible-body black-text">
                                    {user.firstname} {user.lastname} {user.phone} {user.email}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )
        }
    }

    componentDidMount() {
        this.getUsers()
        M.AutoInit();
    }

    componentDidUpdate() {
        M.AutoInit();
    }

    render() {
        return (
            <div className="container">
                <span className="col s12 m12 l12">
                    <h4 className="grey-text text-darken-3 lighten-3 left-align">Users</h4><br />
                    {
                        this.renderUsers()
                    }
                </span>
            </div>
        )
    }
}

export default Users;