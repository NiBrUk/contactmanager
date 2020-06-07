import React, { Component } from 'react';
import { Consumer } from '../../context';
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmit = async (dispatch, e) => {
    const { id } = this.props.match.params;
    e.preventDefault();

    const { name, email, phone } = this.state;

    const updContact = {
      name,
      email,
      phone,
    };

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    // Clear Form Inputs
    this.setState({
      name: '',
      email: '',
      phone: '',
    });

    this.props.history.push('/');
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, phone } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;

          return (
            <div className='card mb-3'>
              <div className='card-header'>Edit Contact</div>
              <div className='card-body'>
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      name='name'
                      className='form-control form-control-lg'
                      placeholder='Update Name...'
                      value={name}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control form-control-lg'
                      placeholder='Update Email...'
                      value={email}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                      type='text'
                      name='phone'
                      className='form-control form-control-lg'
                      placeholder='Update Phone...'
                      value={phone}
                      onChange={this.onChangeHandler}
                    />
                  </div>
                  <input
                    type='submit'
                    value='Update Contact'
                    className='btn btn-light btn-block'
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
