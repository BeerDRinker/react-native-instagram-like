import React from 'react';
import { TouchableOpacity, View, Text, Image, ScrollView, Dimensions, StyleSheet} from 'react-native';
import { connect } from 'react-redux';

import { pickCameraImage, pickGalleryImage } from '../Camera';
import { addImage } from '../redux/actions';

class HomeScreen extends React.Component {

	state = {
		showButtons: false
	}

	static navigationOptions = ( {navigation} ) => {
		let headerTitle = 'Home';
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
				onPress={() => navigation.navigate('User')}>
			 	<Text style= {{ fontSize: 20, color: '#000'}}>
					User
				</Text>
			</TouchableOpacity>);

		return { headerTitle, headerRight, headerStyle };
	}

	render() {

		return (
			<View style={styles.container}>
				<ScrollView>
					{
						this.props.images.map(image => {
							return <Image key={image} source={{ uri: image }} style={styles.image} />
						})
					}
				</ScrollView>
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
					<View style={styles.showButtonsContainer}>
						<TouchableOpacity
							onPress={ () => this.setState({ showButtons: !this.state.showButtons })}
							style={styles.galleryButton}
						>
							<Text style={styles.buttonText}>+</Text>
						</TouchableOpacity>
					</View>
			</View>
		);
	}

	_imageFromGallery = () => {
		this.setState({ showButtons: false });
		pickGalleryImage()
		 .then(result => {
			if (!result.cancelled) {
			this.props.addImage(result.uri);
			}
		})
	}

	_imageFromCamera = () => {
		this.setState({ showButtons: false });
		pickCameraImage()
		 .then(result => {
			if (!result.cancelled) {
			this.props.addImage(result.uri);
			}
		})
	}

}

const imageWidth = Math.round(Dimensions.get('window').width * 0.96);
const imageTopMargin = Math.round(Dimensions.get('window').width * 0.02);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
		backgroundColor: '#BBDEFB',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 80,
		height: 70,
		width: '50%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	image: {
		width: imageWidth,
		height: imageWidth, 
		marginTop: imageTopMargin,
	},
	galleryButton: {
		height: 70,
		width: 70,
		borderRadius: 35,
		backgroundColor: '#1565C0',
		opacity: 0.7,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 18,
		marginTop: 22
	},
	showButtonsContainer: {
		position: 'absolute',
		bottom: 10,
		alignItems: 'center',
		justifyContent: 'center', 
	}
});

const mapStateToProps = state => {
	return {
		images: state.images
	}
}

export default connect(mapStateToProps, { addImage })(HomeScreen);