import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Modal, TouchableOpacity, FlatList } from 'react-native';
import SectionedMultiSelect from 'react-native-multiple-select';
import { Calendar } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const items = [
  { name: 'Cars', id: 1 },
  { name: 'Vans', id: 2 },
  { name: 'SUVs', id: 3 },
  { name: 'Motorbikes', id: 4 },
  { name: 'Trucks', id: 5 },
];

const screenWidth = Dimensions.get('window').width;

export default function Chart() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGraphListModalVisible, setIsGraphListModalVisible] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({});
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

    setGraphs([...graphs, newGraph]);
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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Create Graph</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => setIsGraphListModalVisible(true)}>
        <Text style={styles.buttonText}>Delete Graph</Text>
      </TouchableOpacity>

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
              tagRemoveIconColor="#FFF"
              tagBorderColor="#4CAF50"
              tagTextColor="#FFF"
              selectedItemTextColor="#FFF"
              selectedItemIconColor="#FFF"
              itemTextColor="#000"
              displayKey="name"
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

            <TouchableOpacity style={styles.button} onPress={addGraph}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
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
          <View style={styles.graphItem}>
            <Text style={styles.graphLabel}>{`Data: ${item.items.join(', ')}`}</Text>
            <Text>{`Date Range: ${item.dateRange.startDate} to ${item.dateRange.endDate}`}</Text>

            <LineChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: item.items.map((dataItem, index) => ({
                  data: generateGraphData(),
                  color: () => `rgba(255, 99, 132, ${0.7 + index * 0.1})`, 
                  strokeWidth: 2,
                })),
              }}
              width={screenWidth - 50} 
              height={220}
              chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, 
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
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
    padding: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
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
  closeButton: {
    marginTop: 20,
    color: 'blue',
    textAlign: 'center',
    fontSize: 16,
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
