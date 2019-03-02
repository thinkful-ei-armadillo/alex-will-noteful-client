import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../AppContext';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import config from '../../config';

class Note extends React.Component {
  static contextType = AppContext;
  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    modified: PropTypes.string
  }

  handleDeleteNoteNote = () => {
    fetch(`${config.API_ENDPOINT}notes/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Something went wrong!')
        }
      })
      .then(() => {
        if (this.props.history) { this.props.history.push('/') };
        this.context.handleDeleteNote(this.props.id);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  render() {
    return (
      <div className="note">
        <h3><Link to={`/note/${this.props.id}`} >{this.props.name}</Link></h3>
        <p>{format(this.props.modified, 'Do MMM YYYY')}</p>
        <button className="delete" onClick={() => this.handleDeleteNoteNote()}>Delete</button>
      </div>
    );
  }
}

export default Note;
