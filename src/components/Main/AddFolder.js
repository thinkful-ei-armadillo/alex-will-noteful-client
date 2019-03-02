import React from 'react';
import AppContext from '../../AppContext';
import config from '../../config';

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValid: false,
            nameValidationMessage: '',
        }
    }
    static contextType = AppContext;

    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
    }

    validateName(name) {
        let errorMessage = this.state.nameValidationMessage;
        let error = this.state.nameValid;

        name = name.trim();
        if (name.length === 0) {
            errorMessage = 'Name must have at least 1 character';
            error = true;
        } else if (name.length > 20) {
            errorMessage = 'Name cannot be longer than 20 characters';
            error = true;
        } else {
            error = false;
            errorMessage = '';
        }

        this.setState({
            nameValid: !error,
            nameValidationMessage: errorMessage,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name } = this.state;

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify({folder_name: name})
        }
        fetch(`${config.API_ENDPOINT}folders/`, options)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Something went wrong')
                }
                return resp.json();
            })
            .then(respJson => {
                this.context.addFolder(respJson);
                this.props.history.push(`/folder/${respJson.id}`);
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    
    render() {
        return (
            <section>
                <h2>Create Folder</h2>
                <form onSubmit={(event => this.handleSubmit(event))}>
                    <div>
                        <label htmlFor="folder-name-input">Name</label><br/>
                        <input type="text" placeholder="Folder name..." id="folder-name-input" name="folder-name-input" onChange={event => this.updateName(event.target.value)}/>
                        {(!this.state.nameValid && this.state.nameValidationMessage) && <p className="error__message">{this.state.nameValidationMessage}</p>}
                    </div>
                    <button type="submit" disabled={!this.state.nameValid}>Add Folder</button>
                </form>
            </section>
        );
    }
}

export default AddFolder;