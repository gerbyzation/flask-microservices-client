import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import About from './About';
import AddUser from './components/AddUser';
import UsersList from './components/UsersList';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: '',
      email: '',
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  handleChange(event) {
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  addUser(event) {
    event.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
    };
    axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, data)
    .then(res => {
      this.getUsers();
      this.setState({ username: '', email: '' });
    })
    .catch(err => console.log(err));
  }

  getUsers() {
    axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`)
    .then(res => { this.setState({ users: res.data.data.users }); })
    .catch(err => { console.log(err); });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <br />
            <Switch>
              <Route exact path='/' render={() => (
                <div>
                  <h1>All Users</h1>
                  <hr /><br />
                  <AddUser 
                    username={this.state.username}
                    email={this.state.email}
                    addUser={this.addUser.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                  />
                  <br />
                  <UsersList  users={this.state.users} />
                </div>
              )} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default App;