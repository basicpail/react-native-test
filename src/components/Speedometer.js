import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const Speedometer = ({ speed }) => {
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  useEffect(() => {
    setCurrentSpeed(speed);
  }, [speed]);

  return (
    <View style={styles.container}>
      {/* RadialSlider를 이용한 속도계 */}
      <RadialSlider
        variant="speedometer-marker"  // 기본 속도계 스타일
        value={currentSpeed}
        unit='KM/h'
        min={0}
        max={200}
        onChange={setCurrentSpeed}  // 속도 변경 시 상태 업데이트
        style={styles.slider}
      />
      
      {/* 현재 속도 텍스트 */}
      <Text style={styles.speedText}>{currentSpeed} km/h</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  slider: {
    width: 200,  // RadialSlider 크기 조정
    height: 200,  // RadialSlider 크기 조정
  },
  speedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
});

export default Speedometer;




// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Svg, { Path, Line } from 'react-native-svg';
// import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

// // Animated.Line을 만들어서 Line에 애니메이션 적용
// const AnimatedLine = Animated.createAnimatedComponent(Line);

// // 반원 형태의 Speedometer
// const Speedometer = ({ speed }) => {
//   const animatedSpeed = useSharedValue(speed);

//   useEffect(() => {
//     animatedSpeed.value = withTiming(speed, { duration: 500 });
//   }, [speed]);

//   const animatedProps = useAnimatedProps(() => {
//     const rotation = animatedSpeed.value * 180 / 180 - 90; // 0-180 범위로 회전
//     return { transform: [{ rotate: `${rotation}deg` }] };
//   });

//   return (
//     <View style={styles.container}>
//       <Svg width="200" height="100" viewBox="0 0 200 100">
//         {/* 반원 게이지 */}
//         <Path
//           d="M10,100 A90,90 0 0,1 190,100"
//           stroke="#ccc"
//           strokeWidth="10"
//           fill="none"
//         />
//         <Path
//           d="M10,100 A90,90 0 0,1 190,100"
//           stroke="skyblue"
//           strokeWidth="10"
//           fill="none"
//           strokeDasharray={`${(animatedSpeed.value / 180) * Math.PI * 90} ${Math.PI * 90}`}
//         />
//         {/* 바늘 (애니메이션 적용된 Line) */}
//         <AnimatedLine
//           x1="100"    // 회전 중심
//           y1="100"    // 회전 중심
//           x2="100"    // 바늘 끝
//           y2="30"     // 바늘 끝
//           stroke="red"
//           strokeWidth="3"
//           animatedProps={animatedProps}   // 회전 애니메이션 적용
//         />
//       </Svg>
//       <Text style={styles.speedText}>{speed} km/h</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 20,
//   },
//   speedText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginTop: 10,
//   },
// });

// export default Speedometer;
