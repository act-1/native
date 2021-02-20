import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Box, Text, ProtestFeed } from '../../components';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

function ProtestChat({ navigation, route }: LocationScreenProps) {
  const { feedStore } = useStore();

  return (
    <>
      <Text variant="boxTitle">Hello world!</Text>
    </>
  );
}

export default observer(ProtestChat);

const styles = StyleSheet.create({});
