import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Speedometer from '../components/Speedometer';
import StatusCard from '../components/StatusCard';

const CarMonitor = () => {
  const [speed, setSpeed] = useState(135);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSpeed = Math.floor(Math.random() * 180); // 속도 0~180 사이 랜덤
      setSpeed(newSpeed);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Speedometer speed={speed} />
      <View style={styles.statusContainer}>
        <StatusCard label="Battery Condition" value="Good" progress={0.9} />
        <StatusCard label="Gas Remaining" value="95%" progress={0.95} />
        <StatusCard label="Tyre Temperature" value="85°C" progress={0.7} />
        <StatusCard label="Tyre Pressure" value="35 psi" progress={0.8} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    padding: 20,
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CarMonitor;
