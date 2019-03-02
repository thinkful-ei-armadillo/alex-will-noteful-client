import React from "react";
import { Route, Link, Switch } from 'react-router-dom';
import NoteList from './components/Main/NoteList';
import NoteFull from './components/Main/NoteFull';
import FolderList from './components/Nav/FolderList';
import NoteNav from './components/Nav/NoteNav';
import AppContext from './AppContext';
import AddFolder from './components/Main/AddFolder';
import AddNote from './components/Main/AddNote';
import ErrorPage from './ErrorPage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import config from './config';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [], notes: [], 
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }
    Promise.all([
      fetch(`${config.API_ENDPOINT}folders`, options),
      fetch(`${config.API_ENDPOINT}notes`, options)
    ])
    .then( ([foldersResp, notesResp]) => {
      if (!foldersResp.ok) {
        return foldersResp.json().then(event => Promise.reject(event));
      }
      if (!notesResp.ok) {
        return notesResp.json().then(event => Promise.reject(event));
      }
      return Promise.all([
        foldersResp.json(),
        notesResp.json()
      ])
    })
    .then(([foldersJson, notesJson]) => {
      this.setState({folders: foldersJson, notes: notesJson, loading: false});
    })
    .catch(error => {
      this.setState({error: error.message});
    });
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  handleDeleteFolder = (folderId) => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId),
      notes: this.state.notes.filter(note => note.folder_id !== folderId)
    });
  }

  handleUpdateFolder = (updatedFolder) => {
    console.log(updatedFolder, this.state.folders);
    this.setState({
      folders: this.state.folders.map(folder => {
        return (folder.id !== updatedFolder.id) ? folder : updatedFolder;
      })
    });
  }

  addFolder = (folder) => {
    const folders = [...this.state.folders, folder]
    this.setState({
      folders
    })
  }

  addNote = (note) => {
    const notes = [...this.state.notes, note]
    this.setState({
      notes
    })
  }

  getMainRoutes = () => {
    return (<Switch>
      <Route
        exact path="/"
        component={NoteList}
      />
      <Route
        path="/folder/:folderId"
        component={NoteList}
      />
      <Route
        path="/note/:noteId"
        component={NoteFull}
      />
      <Route
        path="/AddNote"
        component={AddNote}
      />
      <Route
        path="/AddFolder"
        component={AddFolder}
      />
      <Route render={() => <div>Something went wrong!</div>} />
    </Switch>);
  }

  renderMainComponent = () => {
    return (
      <>
        {this.state.error ? <ErrorPage error={this.state.error}/> : !this.state.loading ? (this.getMainRoutes()) : <LoadingScreen/> }
      </>
    );
  }

  renderNavigationComponent = () => {
    return (
      <>
        {!this.state.loading && <Switch>
          <Route 
            path="/note/:noteId"
            component={NoteNav}
          />
          <Route 
            path="/folder/:folderId"
            component={FolderList}
          />
          <Route 
            exact path="/"
            component={FolderList}
          />
          <Route
            path="/AddFolder"
            component={NoteNav}
          />
          <Route
            path="/AddNote"
            component={NoteNav}
          />
          <Route component={NoteNav}/>
        </Switch>}
      </>
    );
  }

  render() {
    return (
      <AppContext.Provider value={{...this.state,
            handleDeleteNote: this.handleDeleteNote, 
            handleDeleteFolder: this.handleDeleteFolder,
            addFolder: this.addFolder, 
            addNote: this.addNote,
            handleUpdateFolder: this.handleUpdateFolder
        }}>
        <header id="SiteTitle" role="banner">
          <Link to='/'>Noteful</Link>
        </header>
        <ErrorPage>
          <nav role="navigation">
            {this.renderNavigationComponent()}
          </nav>
          <main role="main">
            {this.renderMainComponent()}
          </main>
        </ErrorPage>
      </AppContext.Provider>
    );
  }
}

export default App;
