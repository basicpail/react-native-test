import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Speedometer from '../components/Speedometer';
import StatusCard from '../components/StatusCard';
import ACControl from '../components/ACControl';

const CarMonitor = () => {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(200);
  const [isIncreasing, setIsIncreasing] = useState(true);
  const speedRef = useRef(speed); // speed의 최신 상태를 추적

  useEffect(() => {
    speedRef.current = speed; // useRef로 speed 상태 동기화
  }, [speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSpeed = Math.round(Math.random()*200);
      setSpeed(newSpeed);
    }, 1000);

    return () => clearInterval(interval);
  },[])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSpeed((prevSpeed) => {
  //       const currentSpeed = speedRef.current;

  //       console.log("speed:", currentSpeed);

  //       // 속도 증가 중일 때
  //       if (isIncreasing) {
  //         if (currentSpeed < maxSpeed) {
  //           return currentSpeed + 1;
  //         } else {
  //           setIsIncreasing(false); // 방향 전환 (감소로)
  //           return currentSpeed - 1;
  //         }
  //       }
  //       // 속도 감소 중일 때
  //       else {
  //         if (currentSpeed > 0) {
  //           return currentSpeed - 1;
  //         } else {
  //           setIsIncreasing(true); // 방향 전환 (증가로)
  //           return currentSpeed + 1;
  //         }
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [isIncreasing, maxSpeed]); // isIncreasing, maxSpeed 변경 시 재실행


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Speedometer speed={speed} maxSpeed={maxSpeed}/>
      <View style={styles.statusContainer}>
        <StatusCard label="Battery Condition" value="Good" progress={0.9} />
        <StatusCard label="Gas Remaining" value="95%" progress={0.95} />
        <StatusCard label="Tyre Temperature" value="85°C" progress={0.7} />
        <StatusCard label="Tyre Pressure" value="35 psi" progress={0.8} />
      </View>
      <ACControl />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    // backgroundColor: '#1f2431',
    // backgroundColor: '#122031',
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
