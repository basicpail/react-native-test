import React, { useState } from 'react';
// import { View, Text, StyleSheet, Switch, ProgressBarAndroid } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const iconMapping = {
  "Battery Condition": "battery-full",
  "Gas Remaining": "tint",
  "Tyre Temperature": "thermometer-half",
  "Tyre Pressure": "tachometer",
};

const StatusCard = ({ label, value, progress }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.card}>
      <Icon name={iconMapping[label]} size={24} color="#00AEEF" style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={styles.switch}
      />
      <ProgressBarAndroid
        styleAttr="Horizontal"
        indeterminate={false}
        progress={progress}
        color="#00AEEF"
        style={styles.progress}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  icon: {
    marginBottom: 5,
  },
  label: {
    color: '#A0A0A0',
    fontSize: 16,
    marginTop: 5,
  },
  value: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switch: {
    marginVertical: 10,
  },
  progress: {
    width: '80%',
    marginTop: 10,
  },
});

export default StatusCard;
