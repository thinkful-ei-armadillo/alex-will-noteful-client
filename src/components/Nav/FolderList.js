import React from 'react';
import Folder from '../Folder/Folder';
import AppContext from '../../AppContext';
import { Link } from 'react-router-dom';
import config from '../../config';

import FolderUpdateForm from '../Folder/FolderUpdateForm';

class FolderList extends React.Component {
  static contextType = AppContext;

  state = {
    updatingId: null,
  };


  handleDeleteFolder = (folderId) => {
    fetch(`${config.API_ENDPOINT}folders/${folderId}/`, {
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
        if (this.props.history) {
          this.props.history.push('/')
        }
        this.context.handleDeleteFolder(folderId);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  handleUpdateFolder = (folderId, updatedFolderName) => {
    const newFolder = { folder_name: updatedFolderName }
    fetch(`${config.API_ENDPOINT}folders/${folderId}/`, {
      method: 'PATCH',
      body: JSON.stringify(newFolder),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => Promise.reject(error));
        }
      })
      .then(() => {
        this.context.handleUpdateFolder({id: folderId, folder_name: updatedFolderName});
        this.showUpdateFolderForm(null);
      })
      .catch(error => {
        console.log('Something went wrong with the server');
      });
  }

  showUpdateFolderForm = (folderId) => {
    this.setState({ updatingId: folderId });
  }

  getJsxFolders = (folders) => {
    return folders.map((folder) => {
      return (
        <React.Fragment key={folder.id}>
          {folder.id !== this.state.updatingId ? 
            <Folder folder={folder} handleDeleteFolder={this.handleDeleteFolder} showUpdateFolderForm={this.showUpdateFolderForm}/>
            :
            <FolderUpdateForm folder={folder} disableUpdateButton={this.disableUpdateButton} showUpdateFolderForm={this.showUpdateFolderForm} handleUpdateFolder={this.handleUpdateFolder}/>
          }
        </React.Fragment>


        // <li >
        //   {folder.id !== this.state.updatingId ? <Folder folder={folder} /> : 
        //     <FolderUpdateForm folder={folder} disableUpdateButton={(bool) => this.disableUpdateButton(bool)}/>
        //   }
        //   {folder.id !== this.state.updatingId ?
        //     <>
        //       <button className="delete" onClick={() => this.handleDeleteFolder(folder.id)}><i className="fa fa-trash"/></button> 
        //       <button className="update" onClick={() => this.showUpdateFolderForm(folder.id)}><i className="fas fa-edit"/></button>
        //     </>
        //     :
        //     <>
        //       <button className="delete" onClick={() => this.showUpdateFolderForm(null)}><i className="fas fa-ban"/></button> 
        //       <button className="update" disabled={this.state.updateButtonDisabled} onClick={() => this.handleUpdateFolder(folder.id)}><i className="fa fa-check"/></button>
        //     </>
        //     }
        // </li>
      );
    });
  }

  render() {
    const { folders = [] } = this.context;
    return (
      <>
        <ul>
          {this.getJsxFolders(folders)}
        </ul>
        <Link to="/addfolder">
          <button id="AddFolder">Add Folder</button>
        </Link>

      </>
    );
  }
}

// FolderList.defaultProps = {
//   folders: [],
// };

export default FolderList;
