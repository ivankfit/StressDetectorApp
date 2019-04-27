import React, { Component } from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Modal,
  ActivityIndicator,
  Image
} from 'react-native'

import BluetoothSerial from 'react-native-bluetooth-serial'
import { Buffer } from 'buffer'
const iconv = require('iconv-lite')


const Button = ({ title, onPress, style, textStyle }) =>
  <TouchableOpacity style={[ styles.button, style ]} onPress={onPress}>
    <Text style={[ styles.buttonText, textStyle ]}>{title.toUpperCase()}</Text>
  </TouchableOpacity>


const DeviceList = ({ devices, connectedId, showConnectedIcon, onDevicePress }) =>
  <ScrollView style={styles.container}>
    <View style={styles.listContainer}>
      {devices.map((device, i) => {
        return (
          <TouchableHighlight
            underlayColor='#DDDDDD'
            key={`${device.id}_${i}`}
            style={styles.listItem} onPress={() => onDevicePress(device)}>
            <View style={{ flexDirection: 'row' }}>
              {showConnectedIcon
              ? (
                <View style={{ width: 48, height: 48, opacity: 0.4 }}>
                  {connectedId === device.id
                  ? (
                    <Image style={{ resizeMode: 'contain', width: 24, height: 24, flex: 1 }} source={require('./images/ic_done_black_24dp.png')} />
                  ) : null}
                </View>
              ) : null}
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold' }}>{device.name}</Text>
                <Text>{`<${device.id}>`}</Text>
              </View>
            </View>
          </TouchableHighlight>
        )
      })}
    </View>
  </ScrollView>

export default class BTtest extends Component {
    constructor (props) {
      super(props)
      this.state = {
        isEnabled: false,
        discovering: false,
        devices: [],
        unpairedDevices: [],
        connected: false,
        section: 0
      }
    }


componentWillMount () {
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
      this.setState({ isEnabled, devices })
    })

    BluetoothSerial.on('bluetoothEnabled', () => Toast.showShortBottom('Bluetooth enabled'))
    BluetoothSerial.on('bluetoothDisabled', () => Toast.showShortBottom('Bluetooth disabled'))
    BluetoothSerial.on('error', (err) => console.log(`Error: ${err.message}`))
    BluetoothSerial.on('connectionLost', () => {
      if (this.state.device) {
        Toast.showShortBottom(`Connection to device ${this.state.device.name} has been lost`)
      }
      this.setState({ connected: false })
    })
  }
////// requeest user access
  requestEnable () {
    BluetoothSerial.requestEnable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
///////// enable bt
  enable () {
    BluetoothSerial.enable()
    .then((res) => this.setState({ isEnabled: true }))
    .catch((err) => Toast.showShortBottom(err.message))
  }

  disable () {
    BluetoothSerial.disable()
    .then((res) => this.setState({ isEnabled: false }))
    .catch((err) => Toast.showShortBottom(err.message))
  }
//// toggle BT on or off
  toggleBluetooth (value) {
    if (value === true) {
      this.enable()
    } else {
      this.disable()
    }
  }
////////discover unpaired
  discoverUnpaired () {
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        this.setState({ unpairedDevices, discovering: false })
      })
      .catch((err) => Toast.showShortBottom(err.message))
    }
  }
//// cancel 
  cancelDiscovery () {
    if (this.state.discovering) {
      BluetoothSerial.cancelDiscovery()
      .then(() => {
        this.setState({ discovering: false })
      })
      .catch((err) => Toast.showShortBottom(err.message))
    }
  }
////// pair device
  pairDevice (device) {
    BluetoothSerial.pairDevice(device.id)
    .then((paired) => {
      if (paired) {
        Toast.showShortBottom(`Device ${device.name} paired successfully`)
        const devices = this.state.devices
        devices.push(device)
        this.setState({ devices, unpairedDevices: this.state.unpairedDevices.filter((d) => d.id !== device.id) })
      } else {
        Toast.showShortBottom(`Device ${device.name} pairing failed`)
      }
    })
    .catch((err) => Toast.showShortBottom(err.message))
  }

}
