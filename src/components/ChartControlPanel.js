import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

export default function ChartControlPanel({ onCreatePress, onDeletePress }) {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [panelWidth] = useState(new Animated.Value(200)); // 초기 패널 너비 설정

  const togglePanel = () => {
    const toWidth = isPanelVisible ? 0 : 200; // 숨길 때 너비를 0, 보일 때 200으로 설정

    Animated.timing(panelWidth, {
      toValue: toWidth,
      duration: 300, // 애니메이션 지속 시간
      useNativeDriver: false,
    }).start();

    setIsPanelVisible(!isPanelVisible);
  };

  return (
    <View style={styles.container}>
        {isPanelVisible ? (
            <View style={styles.row}>
                {/* 화살표 버튼은 항상 보이도록 유지 */}
                <TouchableOpacity onPress={togglePanel} style={styles.arrowButton}>
                <Text style={styles.arrow}>▲</Text>
                </TouchableOpacity>

                {/* 패널이 펼쳐졌을 때만 버튼이 보이도록 애니메이션 처리 */}
                <Animated.View style={[styles.buttonContainer, { width: panelWidth }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onCreatePress(true)}
                    disabled={!isPanelVisible}
                >
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onDeletePress(true)}
                    disabled={!isPanelVisible}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                </Animated.View>
            </View>
        ):(
            <View>
                {/* 화살표 버튼은 항상 보이도록 유지 */}
                <TouchableOpacity onPress={togglePanel} style={styles.arrowButton}>
                <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
            </View>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E2A',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrowButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  arrow: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginHorizontal: 5,
    opacity: 1, // 버튼 활성화 상태 제어
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
