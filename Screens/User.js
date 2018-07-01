import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, TextInput, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { addAvatar, changeFirstName, changeLastName } from '../redux/actions';
import { pickCameraImage, pickGalleryImage } from '../Camera';

class UserScreen extends React.Component {

	state = {
		showButtons: false,
		userName: '',
		userLastName: ''
	};

	static navigationOptions = ( {navigation} ) => {
		let headerTitle = 'User';
		let headerStyle = {
      backgroundColor: '#2196F3'
    };
		let headerRight = 
			(<TouchableOpacity
				style={{
					height: 40,
					width: 60,
					alignItems: 'center',
					justifyContent: 'center',
					backgroundColor: '#E3F2FD',
					margin: 5,
					marginRight: 10,
					shadowColor: 'black',
					shadowOpacity: 0.5,
					shadowOffset: {
						width: 2,
						height: 2,
					}
				}}
				onPress={() => navigation.navigate('Home')}>
			 	<Text style= {{ fontSize: 20, color: '#000'}}>
					Home
				</Text>
			</TouchableOpacity>);
		return { headerTitle, headerRight, headerStyle };
	}

	render() {
		return (
			<View style={styles.container}>
				{
					this.state.showButtons
					?
					<View style={styles.buttonContainer}>
						<TouchableOpacity
							onPress={ this._imageFromGallery }
							style={styles.galleryButton}
						>
							<Text style={styles.buttonText}>Gallery</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={ this._imageFromCamera }
							style={styles.galleryButton}
						>
							<Text style={styles.buttonText}>Camera</Text>
						</TouchableOpacity>
					</View>
					:
					<View />
				}
				<TouchableOpacity style={styles.avatarWrapper} onPress={ () => this.setState({ showButtons: !this.state.showButtons })}> 
					{
						this.props.avatar
						? <Image source={{uri: this.props.avatar }} style={styles.avatarImage} />
						: <Image source={require('../assets/cat-200-200.jpg')} style={styles.avatarImage} /> 
				}
				</TouchableOpacity>
				<View style={styles.textWrapper}>
					<Text style={styles.userName}>
						{this.props.firstName} {this.props.lastName}
					</Text>
				</View>
				<View style={styles.imputWrapper}>
					<TextInput
						ref={input => { this.textInputFirst = input }}
						name={'firstName'}
						style={styles.textRow}
						onChange={this._onChangeFirstName}
						underlineColorAndroid='transparent'
						placeholder="First Name"
					/>
					<TextInput
						ref={input => { this.textInputLast = input }}
						name={'lastName'}
						style={styles.textRow}
						underlineColorAndroid='transparent'
						onChange={this._onChangeLastName}
						placeholder="Last Name"
					/>
				</View>
				<View style={styles.btnWrapper}>
					<TouchableHighlight style={styles.btn} onPress={() => this._submitForm() } disabled={this.state.userName.length === 0 || this.state.userLastName.length === 0}>
						<Text style={styles.btnText}>Save</Text>
					</TouchableHighlight> 
				</View>
			</View>
		);
	}

	_imageFromGallery = () => {
		this.setState({ showButtons: false });
		pickGalleryImage()
			.then(result => {
			if (!result.cancelled) {
			this.props.addAvatar(result.uri);
			}
		})
	}

	_imageFromCamera = () => {
		this.setState({ showButtons: false });
		pickCameraImage()
			.then(result => {
			if (!result.cancelled) {
			this.props.addAvatar(result.uri);
			}
		})
	}

	_onChangeFirstName = (event) => {
		this.setState({ userName: event.nativeEvent.text });
	}

	_onChangeLastName = (event) => {
		this.setState({ userLastName: event.nativeEvent.text });
	}

	_submitForm = () => {
		this.props.changeFirstName(this.state.userName);
		this.props.changeLastName(this.state.userLastName);
		this.textInputFirst.clear();
		this.textInputLast.clear();
		this.setState({ userName: '' });
		this.setState({ userLastName: '' });
	}
}

const formWidth = Math.round(Dimensions.get('window').width * 0.9);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#BBDEFB',
	},
	avatarWrapper: {
		height: 200,
		width: 200,
		borderRadius: 100,
		marginTop: 50,
	},
	avatarImage: {
		height: 200,
		width: 200,
		borderRadius: 100
	},
	buttonContainer: {
		position: 'absolute',
		top: 200,
		height: 70,
		width: '90%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	galleryButton: {
		height: 70,
		width: 70,
		borderRadius: 35,
		backgroundColor: '#2962FF',
		opacity: 0.8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		marginTop: 22
	},
	textWrapper: {
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	userName: {
		fontSize: 24
	},
	imputWrapper: {
		marginTop: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: formWidth,
		height: 48,
	},
	textRow: {
		fontSize: 20,
		width: '49%',
		height: 48,
		paddingLeft: 10,
		paddingRight: 10,
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		marginTop: 20,
		borderWidth: 1,
		backgroundColor: '#f9f9f9',
		borderColor: '#d8d8d8',
	},
	btnWrapper: {
		marginTop: 10
	},
	btn: {
		marginTop: 20,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: formWidth / 2,
		borderRadius: 3,
		backgroundColor: '#1565C0',
	},
	btnText: {
		color: '#fff',
		fontSize: 20,
	},
});

const mapStateToProps = state => {
	return {
		avatar: state.user.avatar,
		firstName: state.user.firstName,
		lastName: state.user.lastName,
	}
}

export default connect(mapStateToProps, { addAvatar, changeFirstName, changeLastName })(UserScreen);