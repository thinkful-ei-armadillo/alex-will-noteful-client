import React from 'react';
import { Link } from 'react-router-dom';

function Folder(props) {
  const folderId = props.folder.id;
  return (
    <li>
      <Link to={`/folder/${folderId}`} className="folderContainer">{props.folder.folder_name}</Link>
      <button className="delete" onClick={() => props.handleDeleteFolder(folderId)}><i className="fa fa-trash"/></button> 
      <button className="update" onClick={() => props.showUpdateFolderForm(folderId)}><i className="fas fa-edit"/></button>
    </li>
  );
}

Folder.defaultProps = {
  folder: {},
};

export default Folder;
