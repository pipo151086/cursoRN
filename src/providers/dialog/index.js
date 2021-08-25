import React, {Component} from 'react';
import {DisplayDialog} from 'odc-mobile-common';

const DialogContext = React.createContext({});
export const DialogConsumer = DialogContext.Consumer;
export class DialogProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_visible: false,
			_title: '',
			_message: '',
			_okPressed: null,
			_cancelPressed: null,
			_type: '',
		};
	}

	handleOkPressed = () => {
		this.setState({_visible: false});
		if (this.state._okPressed) this.state._okPressed();
	};

	handleCancelPressed = () => {
		this.setState({_visible: false});
		if (this.state._cancelPressed) this.state._cancelPressed();
	};

	showAlert = (title, msg, cancelPressed, okPressed, type) => {
		this.setState({
			_visible: true,
			_title: title,
			_message: msg,
			_okPressed: okPressed,
			_cancelPressed: cancelPressed,
			_type: type ? type : 'info',
		});
	};

	render() {
		const {
			_visible,
			_type,
			_title,
			_message,
			_okPressed,
			_cancelPressed,
		} = this.state;
		const funcs = {
			displayAlert: this.showAlert,
		};
		return (
			<DialogContext.Provider value={{...funcs}}>
				{this.props.children}
				<DisplayDialog
					visible={_visible}
					type={_type}
					title={_title}
					message={_message}
					okPressed={this.handleOkPressed}
					cancelPressed={this.handleCancelPressed}
				/>
			</DialogContext.Provider>
		);
	}
}
