import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";

const ACControl = () => {
  const [isACOn, setIsACOn] = useState(false);
  const [temperature, setTemperature] = useState(14); // 온도 값
  const [windLevel, setWindLevel] = useState(50); // 풍량 값

  // 에어컨 켜고 끄기
  const toggleAC = () => setIsACOn((prevState) => !prevState);

  useEffect(() => {
    // 온도와 풍량 값 주기적으로 변경
    const interval = setInterval(() => {
      setTemperature((prev) => (prev >= 30 ? 14 : prev + 2)); // 14°C ~ 30°C 반복
      setWindLevel((prev) => (prev >= 100 ? 10 : prev + 10)); // 10% ~ 100% 반복
    }, 2000); // 2초 간격으로 업데이트

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, []);

  return (
    <View style={styles.container}>
      {/* AC 상태 */}
      <View style={styles.acHeader}>
        <Icon name="fan" size={24} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.acLabel}>AC</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#4BE1F5" }}
          thumbColor={isACOn ? "#00ff00" : "#f4f3f4"}
          onValueChange={toggleAC}
          value={isACOn}
        />
      </View>

      {/* 온도와 풍량 상태 */}
      <View style={styles.statusContainer}>
        {/* 온도 상태 */}
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Temperature</Text>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={["#00F260", "#0575E6"]}
              style={[
                styles.progressBar,
                { width: `${(temperature / 30) * 100}%` }, // 온도에 따라 너비 조절
              ]}
            />
          </View>
          <Text style={styles.statusValue}>{temperature}°C</Text>
        </View>
        {/* 풍량 상태 */}
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>Wind Level</Text>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={["#9D50BB", "#6E48AA"]}
              style={[
                styles.progressBar,
                { width: `${windLevel}%` }, // 풍량에 따라 너비 조절
              ]}
            />
          </View>
          <Text style={styles.statusValue}>{windLevel}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: "98%",
    alignSelf: "center",
  },
  acHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  icon: {
    backgroundColor: "#7648E8",
    padding: 10,
    borderRadius: 10,
  },
  acLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginHorizontal: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusBox: {
    width: "45%",
    backgroundColor: "#292929",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#444",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  statusLabel: {
    fontSize: 14,
    color: "#CCCCCC",
    textAlign: "center",
  },
});

export default ACControl;
