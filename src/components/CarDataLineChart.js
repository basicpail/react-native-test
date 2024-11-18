import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MultiSelect from 'react-native-multiple-select';  // corrected import
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';

const CarDataLineChart = () => {
  const [graphs, setGraphs] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCreateGraphModalVisible, setIsCreateGraphModalVisible] = useState(false);

  const dataItems = [
    { id: 'data1', name: 'Data 1' },
    { id: 'data2', name: 'Data 2' },
    { id: 'data3', name: 'Data 3' },
  ];

  // 선택된 데이터 항목이 변경될 때 상태를 업데이트하는 함수
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedData(selectedItems);  // 선택된 아이템을 상태에 저장
  };

  const addGraph = () => {
    if (selectedData.length === 0 || !selectedDate) {
      Alert.alert('Please select data and date first.');
      return;
    }

    const newGraph = {
      id: Math.random().toString(),
      data: selectedData,
      date: selectedDate,
      chartConfig: {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, 
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }
    };

    setGraphs([...graphs, newGraph]);
    setIsCreateGraphModalVisible(false); // 모달 닫기
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Select Data and Date for Graph</Text>

      {/* Create Graph 버튼 */}
      <Button title="Create Graph" onPress={() => setIsCreateGraphModalVisible(true)} />

      {/* Create Graph Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCreateGraphModalVisible}
        onRequestClose={() => setIsCreateGraphModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Select Data</Text>

          {/* 다중 데이터 선택을 위한 MultiSelect 사용 */}
          <MultiSelect
            items={dataItems}
            uniqueKey="id"
            displayKey="name"
            selectedItems={selectedData}
            onSelectedItemsChange={onSelectedItemsChange}  // onSelectedItemsChange를 제대로 전달
            selectText="Pick Data"
            searchInputPlaceholderText="Search Data..."
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CC0000"
            selectedItemIconColor="#CC0000"
            itemTextColor="#000"
            submitButtonText="Submit"
            selectAllText="Select All"
            submitButtonColor="#CCC"
          />

          <Text>Select Date</Text>

          {/* 날짜 선택을 위한 Calendar 사용 */}
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue', selectedTextColor: 'white' },
            }}
          />

          <Button title="Submit" onPress={addGraph} />
          <Button title="Cancel" onPress={() => setIsCreateGraphModalVisible(false)} />
        </View>
      </Modal>

      {/* 그래프 목록 출력 */}
      <FlatList
        data={graphs}
        renderItem={({ item }) => (
          <View>
            <Text>{`Graph on ${item.date}`}</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                datasets: [
                  {
                    data: item.data.includes('data1') ? [10, 20, 30, 40, 50, 60, 70] : 
                           item.data.includes('data2') ? [15, 25, 35, 45, 55, 65, 75] : 
                           [20, 30, 40, 50, 60, 70, 80]
                  }
                ]
              }}
              width={320} // from react-native
              height={220}
              chartConfig={item.chartConfig}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 반투명 배경
  },
});

export default CarDataLineChart;
