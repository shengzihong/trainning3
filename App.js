/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './views/Login';
import LongPage from './views/LongPage';
import ViewPager from './views/ViewPager';

import jsonData from './ImageData.json';

export default class trainning3 extends Component {
  render() {
    return (
      // <Login />
      // <LongPage />
      <ViewPager imageSources={jsonData.data} />
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('trainning3', () => trainning3);
