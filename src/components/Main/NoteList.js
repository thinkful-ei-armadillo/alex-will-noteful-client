import React from 'react';
import Note from '../Note/Note';
import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = AppContext;

  getFolderNotes = (notes, folderId) => {
    if (!folderId) {
      return notes;
    } else {
      return this.context.notes.filter(note => note.folder_id === parseInt(folderId));
    }
  }

  jsxNotes = (notes) => {
    return notes.map((note) => {
        return (
            <li key={note.id} id={note.id}>
              <Note id={note.id} name={note.note_name} modified={note.modified} />
            </li>
        );
    });
  };

  render() {
    const folderId = this.props.match.params.folderId;
    const { notes = [] } = this.context;
    const notesToShow = this.getFolderNotes(notes, folderId);
    return (
      <>
        <ul>
          {this.jsxNotes(notesToShow)}
        </ul>
        <Link to='/AddNote'><button>Add Note</button></Link>
      </>
    );
  }
}

export default NoteList;
