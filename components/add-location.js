import React from 'react';
import styles from './login-addlocation-container.scss';

class AddLocation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisibility: false,
			error: ''
		};
	}

	render(){
    return (
      <div>
      	Add location dom
      </div>
    );
	}
}

export default AddLocation;