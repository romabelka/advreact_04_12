import React, { Component } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Camera, Permissions } from "expo"
import {inject} from 'mobx-react'

@inject('auth')
export class UserAvatarScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === "granted" })
  }

  render() {
    const { hasCameraPermission } = this.state

    if (hasCameraPermission === null) {
      return (
        <View>
          <Text>Asking for permissions</Text>
        </View>
      )
    }

    if (hasCameraPermission === false) {
      return (
        <View>
          <Text>no permissions</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => {
            this.camera = ref
          }}
          style={{ flex: 1 }}
          type={this.state.type}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row"
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                })
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: "flex-start",
                alignItems: "center"
              }}
              onPress={this.snap}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {" "}
                Take Photo{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    )
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true })
      await this.props.auth.uploadPhoto(photo)
    }
  }
}
