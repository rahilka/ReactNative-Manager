import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk'; //Redux Thunk is a middleware
import reducers from './reducers';
import Router from './Router';

class App extends Component {
	componentWillMount() {
		const config = {
			apiKey: 'AIzaSyAdaAYTqbNtL2TfzsTizdx5fWct8OKsN9U',
			authDomain: 'manager-2e6b0.firebaseapp.com',
			databaseURL: 'https://manager-2e6b0.firebaseio.com',
			projectId: 'manager-2e6b0',
			storageBucket: 'manager-2e6b0.appspot.com',
			messagingSenderId: '740792796814'
		};
		firebase.initializeApp(config);
	}
	
	render() {
		const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
