import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider} from 'react-redux';

import rootReducer from './redux/reduceds'

import HomeScreen from './Screens/Home';
import UserScreen from './Screens/User';

const store = createStore(rootReducer);

const RootStack = createStackNavigator({
	Home: {
		screen: HomeScreen
	},
	User: {
		screen: UserScreen
	}
}, {initialRouteName: 'Home'});

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RootStack/>
			</Provider>
		);
	}
}