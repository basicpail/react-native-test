import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import SectionedMultiSelect from 'react-native-multiple-select';
import { Calendar } from 'react-native-calendars';
import DatePicker from 'react-native-date-picker';
import { LineChart } from 'react-native-chart-kit';
import ChartControlPanel from '../components/ChartControlPanel';

const items = [
  { name: 'Cars', id: 1 },
  { name: 'Vans', id: 2 },
  { name: 'SUVs', id: 3 },
  { name: 'Motorbikes', id: 4 },
  { name: 'Trucks', id: 5 },
];

const colors = [
  '#FF5733', // Red
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A8', // Pink
  '#FFC733', // Yellow
];

const screenWidth = Dimensions.get('window').width;

export default function Chart() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGraphListModalVisible, setIsGraphListModalVisible] = useState(false);
  // const [selectedDateRange, setSelectedDateRange] = useState({});
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
  });
  const [tempTime, setTempTime] = useState(new Date()); // 시간 선택 임시 저장
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [timePickerMode, setTimePickerMode] = useState("start");
  const [graphs, setGraphs] = useState([]);
  const [selectedGraphsToDelete, setSelectedGraphsToDelete] = useState([]);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const onDateSelect = (date) => {
    const startDate = selectedDateRange.startDate ? selectedDateRange.startDate : date.dateString;
    setSelectedDateRange({
      ...selectedDateRange,
      startDate: startDate,
      endDate: date.dateString,
    });
  };

  const handleTimeSelect = (date) => {
    console.log('handleTimeSelect_date: ', date);
    const timeString = `${date.getHours()}:${date.getMinutes()}`;
    if (timePickerMode === "start") {
      setSelectedDateRange({ ...selectedDateRange, startTime: timeString });
    } else {
      setSelectedDateRange({ ...selectedDateRange, endTime: timeString });
    }
    setIsTimePickerVisible(false);
  };

  const addGraph = () => {
    if (selectedItems.length === 0 || !selectedDateRange.startDate || !selectedDateRange.endDate) {
      alert('Please select data and date range.');
      return;
    }

    const newGraph = {
      id: graphs.length + 1,
      items: selectedItems,
      dateRange: selectedDateRange,
    };

    // setGraphs([...graphs, newGraph]);
    setGraphs([newGraph, ...graphs]);
    setIsModalVisible(false);
    setSelectedItems([]);
    setSelectedDateRange({});
  };

  const deleteSelectedGraphs = () => {
    setGraphs(graphs.filter(graph => !selectedGraphsToDelete.includes(graph.id)));
    setIsGraphListModalVisible(false);
    setSelectedGraphsToDelete([]);
  };

  const generateGraphData = () => {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push(Math.floor(Math.random() * 100) + 1); // Random data points
    }
    return data;
  };

  // const generateDateLabels = (startDate, endDate) => {
  //   if (!startDate || !endDate) return [];
  //   let labels = [];
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const totalDays =
  //     Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

  //   labels.push(startDate); // 첫 번째 날짜
  //   if (totalDays > 2) {
  //     const step = Math.floor(totalDays / 3); // 중간 날짜 2~3개
  //     let current = new Date(start);
  //     for (let i = 1; i <= 2; i++) {
  //       current.setDate(start.getDate() + i * step);
  //       if (current < end) {
  //         labels.push(current.toISOString().split('T')[0]);
  //       }
  //     }
  //   }
  //   labels.push(endDate); // 마지막 날짜
  //   return labels;
  // };

  const generateDateLabels = (startDate, endDate, startTime, endTime) => {
    if (!startDate || !endDate) return [];
  
    // Pad time values to ensure two digits
    const padTime = (time) => {
      const [hour, minute] = time.split(':').map((t) => t.padStart(2, '0'));
      return `${hour}:${minute}`;
    };
  
    const startISO = `${startDate}T${padTime(startTime || '00:00')}`;
    const endISO = `${endDate}T${padTime(endTime || '23:59')}`;
  
    const start = new Date(startISO);
    const end = new Date(endISO);
  
    if (isNaN(start) || isNaN(end)) {
      throw new Error('Invalid Date Format');
    }
  
    const diffInMs = end - start;
    if (diffInMs <= 0) return [`${startDate} ${padTime(startTime)}`, `${endDate} ${padTime(endTime)}`];
  
    const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const labelDates = [start];
  
    // Add 2-3 intermediate labels
    const interval = Math.floor(totalDays / 3);
    for (let i = 1; i <= 2; i++) {
      const nextDate = new Date(start);
      nextDate.setDate(start.getDate() + interval * i);
      if (nextDate < end) labelDates.push(nextDate);
    }
  
    labelDates.push(end);
  
    // Format labels with shorter date and time
    return labelDates.map((date) => {
      const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${year}${month}${day} ${hours}:${minutes}`; // Shortened format
    });
  };
  
  
  



  return (
    <View style={styles.container}>
      <ChartControlPanel onCreatePress={setIsModalVisible} onDeletePress={setIsGraphListModalVisible}/>
      {/* <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Create Graph</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setIsGraphListModalVisible(true)}>
        <Text style={styles.buttonText}>Delete Graph</Text>
      </TouchableOpacity> */}

      {/* Modal to select data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Data</Text>

            <SectionedMultiSelect
              items={items}
              uniqueKey="id"
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              single={false} 
              selectText="Pick Data"
              searchInputPlaceholderText="Search Data..."
              // tagRemoveIconColor="#FFF"
              // tagBorderColor="#4CAF50"
              // tagTextColor="#FFF"
              // selectedItemTextColor="#FFF"
              // selectedItemIconColor="#FFF"
              // itemTextColor="#000"
              // displayKey="name"
              submitButtonText="Submit"
            />

            <Text style={styles.modalTitle}>Select Date Range</Text>
            <Calendar
              onDayPress={(day) => onDateSelect(day)}
              markedDates={{
                [selectedDateRange.startDate]: { selected: true, selectedColor: 'blue' },
                [selectedDateRange.endDate]: { selected: true, selectedColor: 'blue' },
                ...generateMarkedDates(selectedDateRange.startDate, selectedDateRange.endDate),
              }}
            />

            <View style={styles.datePickerContainer}>
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => {
                  setTimePickerMode('start');
                  setIsTimePickerVisible(true);
                }}
              >
              <Text style={styles.datePickerButtonText}>Select Start Time</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => {
                  setTimePickerMode('end');
                  setIsTimePickerVisible(true);
                }}
              >
                <Text style={styles.datePickerButtonText}>Select End Time</Text>
              </TouchableOpacity>

            </View>

            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 20 }}>
              {`${selectedDateRange.startDate || ''} ${selectedDateRange.startTime || ''} - ${selectedDateRange.endDate || ''} ${selectedDateRange.endTime || ''}`}
            </Text>



            <TouchableOpacity style={styles.button} onPress={addGraph}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>

            {/* Time Picker */}
            {isTimePickerVisible && (
              <DatePicker
                modal
                open={isTimePickerVisible}
                date={tempTime}
                mode="time"
                onConfirm={(date) => {
                  setTempTime(date);
                  handleTimeSelect(date);
                }}
                onCancel={() => setIsTimePickerVisible(false)}
              />
            )}

          </View>
        </View>
      </Modal>

      

      {/* Modal to select graphs to delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isGraphListModalVisible}
        onRequestClose={() => setIsGraphListModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Graphs to Delete</Text>

            <SectionedMultiSelect
              items={graphs.map((graph) => ({
                name: `Graph ${graph.id}: ${graph.items.join(', ')}`,
                id: graph.id,
              }))}
              uniqueKey="id"
              onSelectedItemsChange={setSelectedGraphsToDelete}
              selectedItems={selectedGraphsToDelete}
              single={false}
              selectText="Select Graphs to Delete"
              submitButtonText="Delete Selected Graphs"
            />

            <TouchableOpacity style={styles.button} onPress={deleteSelectedGraphs}>
              <Text style={styles.buttonText}>Delete Selected Graphs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsGraphListModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* List of added graphs */}
      {/* <Text style={styles.graphListTitle}>Added Graphs</Text> */}
      <FlatList
        data={graphs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // <View style={styles.graphItem}>
          <View style={styles.chartContainer}>
            {/* <Text style={styles.graphLabel}>{`Data: ${item.items.join(', ')}`}</Text> */}
            {/* <Text>{`Date Range: ${item.dateRange.startDate} to ${item.dateRange.endDate}`}</Text> */}

            <LineChart
              data={{
                // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                labels: generateDateLabels(item.dateRange.startDate, item.dateRange.endDate, item.dateRange.startTime, item.dateRange.endTime),
                datasets: item.items.map((dataItem, index) => ({
                  data: generateGraphData(),
                  // color: () => `rgba(255, 99, 132, ${0.7 + index * 0.1})`, 
                  color: () => colors[index % colors.length], 
                  strokeWidth: 2,
                })),
                legend: item.items.map((id) => `${id}`),
              }}
              width={screenWidth - 20} 
              height={220}
              // horizontalLabelRotation={-45}
              // verticalLabelRotation={-10}
              chartConfig={{
                backgroundGradientFrom: '#1E1E2A',
                backgroundGradientTo: '#1E1E2A',
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                // backgroundColor: '#e26a00',
                // backgroundGradientFrom: '#fb8c00',
                // backgroundGradientTo: '#ffa726',
                // decimalPlaces: 2, 
                // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                // labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontSize: 11,
                  // rotation: -10
                  // transform: [{ rotate: '-45deg' }],
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                  // stroke: '#fffa726',
                },
              }}
              bezier
            />
          </View>
        )}
      />
    </View>
  );
}

const generateMarkedDates = (startDate, endDate) => {
  if (!startDate || !endDate) return {};
  let markedDates = {};
  let currentDate = new Date(startDate);
  let end = new Date(endDate);
  
  while (currentDate <= end) {
    markedDates[currentDate.toISOString().split('T')[0]] = { selected: true, selectedColor: 'blue' };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return markedDates;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
    justifyContent: 'center',
    padding: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 30,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'stretch',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  datePickerButton: {
    // backgroundColor: '#4CAF50',
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  datePickerButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
  },
  chartContainer: {
    width: screenWidth,
    backgroundColor: '#1E1E2A',
    borderRadius: 10,
    // padding: 10,
    margin: 10
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // elevation: 5,
  },
  graphListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  graphItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  graphLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
