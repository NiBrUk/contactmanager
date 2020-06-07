import React, { Component } from 'react';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
  state = {
    showContactInfo: false,
  };

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { contact } = this.props;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-3'>
              <h4>
                {contact.name}{' '}
                <Link to={`contact/edit/${contact.id}`}>
                  <i
                    className='fa fa-pencil'
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'blue',
                      marginLeft: '1rem',
                    }}
                  />
                </Link>
                <i
                  className='fa fa-sort-down'
                  onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo,
                    })
                  }
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className='fa fa-times'
                  style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                  onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
                />
              </h4>
              {showContactInfo ? (
                <ul className='list-group'>
                  <li className='list-group-item'>Email: {contact.email}</li>
                  <li className='list-group-item'>Phone: {contact.phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
