import React from 'react';
import FolderErrorMessage from '../ErrorMessages/FolderErrorMessage';
import proptypes from 'prop-types';

class FolderUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      updatedFolderName: this.props.folder.folder_name,
      error: null,
      updateButtonDisabled: false,
    }
  }

  static defaultProps = {
    folder: {},
  }

  static propTypes = {
    folder: proptypes.object
  }

  validateupdatedFolderName = (name) => {
    if (name.length <= 0) {
      this.setState({error: 'Name must have at least one character.'}, () => this.disableUpdateButton(true));
    } else if (name.length > 20) {
      this.setState({error: 'Name must have less than 20 characters.'}, () => this.disableUpdateButton(true));
    } else {
      this.setState({error: null}, () => this.disableUpdateButton(false));
    }
  }

  handleUpdateName = (name) => {
    this.validateupdatedFolderName(name);
    this.setState({updatedFolderName: name});
  }

  disableUpdateButton = (bool) => {
    this.setState({updateButtonDisabled: bool});
  }

  render() {
    return (
      <li>
        {this.state.error && <FolderErrorMessage message={this.state.error}/>}
        <input type="text" className="folderUpdateInput" value={this.state.updatedFolderName} onChange={(e) => this.handleUpdateName(e.target.value)}></input>
        <button className="delete" onClick={() => this.props.showUpdateFolderForm(null)}><i className="fas fa-ban"/></button> 
        <button className="update" disabled={this.state.updateButtonDisabled} onClick={() => this.props.handleUpdateFolder(this.props.folder.id, this.state.updatedFolderName)}><i className="fa fa-check"/></button>
      </li>
    );
  }
}

export default FolderUpdateForm;
