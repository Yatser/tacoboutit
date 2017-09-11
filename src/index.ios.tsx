import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAoNgrPuY1KI89e3yUjNuByJhd3HkjK4x0',
  authDomain: 'tacoboutit-cc34d.firebaseapp.com',
  databaseURL: 'https://tacoboutit-cc34d.firebaseio.com',
  projectId: 'tacoboutit-cc34d',
  storageBucket: 'tacoboutit-cc34d.appspot.com',
  messagingSenderId: '190184599829'
}
firebase.initializeApp(config)

export default class App extends Component {

  fbAuth() {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(result => {
      if (result.isCancelled) {
        console.log('login cancelled')
      } else {
        console.log('login success')
        AccessToken.getCurrentAccessToken().then(data => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
          firebase.auth().signInWithCredential(credential).then(() => {
            console.log('firebase login success')
          }, error => {
            console.error('firebase login error: ' + error)
          })
        }, error => {
          console.error('get current access token error: ' + error)
        })
      }
    }, error => {
      console.error('login error: ' + error)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.fbAuth}>
          <Text>Login with Facebook</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

AppRegistry.registerComponent('tacoboutit', () => App)
