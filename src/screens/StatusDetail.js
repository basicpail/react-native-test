import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const icons = [
  { name: 'car-outline', id: 'home', label: '일반' },
  { name: 'speedometer-outline', id: 'performance', label: '주행' },
//   { name: 'navigate-outline', id: 'navigation', label: '네비' },
  { name: 'construct-outline', id: 'maintenance', label: '유지보수' },
  { name: 'flash-outline', id: 'battery', label: '배터리' },
  { name: 'thermometer-outline', id: 'temperature', label: '온도' },
//   { name: 'water-outline', id: 'fuel', label: '연료' },
//   { name: 'lock-closed-outline', id: 'security', label: '잠금' },
];

const data = {
    performance: [
      { title: 'Battery Condition', value: 'Good', icon: 'flash-outline' },
      { title: 'Gas Remaining', value: '95%', icon: 'water-outline' },
      { title: 'Tyre Temperature', value: '85°C', icon: 'thermometer-outline' },
      { title: 'Tyre Pressure', value: '35psi', icon: 'speedometer-outline' },
      { title: 'Engine Status', value: 'Optimal', icon: 'car-outline' },
      { title: 'Coolant Level', value: '70%', icon: 'snow-outline' },
      { title: 'Oil Level', value: 'Full', icon: 'flame-outline' },
      { title: 'Transmission Fluid', value: 'Normal', icon: 'sync-outline' },
    ],
    home: [
      { title: 'Average Speed', value: '50km/h', icon: 'speedometer-outline' },
      { title: 'Odometer', value: '12,345 km', icon: 'earth-outline' },
      { title: 'Fuel Efficiency', value: '15km/l', icon: 'leaf-outline' },
      { title: 'Trip Distance', value: '120 km', icon: 'locate-outline' },
      { title: 'Headlight Status', value: 'ON', icon: 'sunny-outline' },
      { title: 'Brake Status', value: 'Normal', icon: 'ellipse-outline' },
    ],
    maintenance: [
      { title: 'GPS Signal', value: 'Strong', icon: 'navigate-outline' },
      { title: 'Bluetooth', value: 'Connected', icon: 'bluetooth-outline' },
      { title: 'Air Conditioning', value: 'ON', icon: 'snow-outline' },
      { title: 'Doors Locked', value: 'Yes', icon: 'lock-closed-outline' },
      { title: 'Windows Closed', value: 'Yes', icon: 'checkbox-outline' },
      { title: 'Parking Brake', value: 'Active', icon: 'car-outline' },
    ],
  };
  

const StatusDetail = () => {
  // Default to the first icon being selected
  const [activeTab, setActiveTab] = useState(icons[0].id);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Icon name={item.icon} size={30} color="#00AEEF" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardValue}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#101010', '#101010']} style={styles.container}>
      {/* Top Menu */}
      <View style={styles.topMenu}>
        {icons.map((icon) => (
          <TouchableOpacity
            key={icon.id}
            onPress={() => setActiveTab(icon.id)}
            style={[
              styles.iconWrapper,
              activeTab === icon.id && styles.activeIconWrapper,
            ]}
          >
            <Icon
              name={icon.name}
              size={30}
              color={activeTab === icon.id ? 'black' : 'white'}
            />
            <Text
              style={[
                styles.iconLabel,
                { color: activeTab === icon.id ? 'black' : 'white' },
              ]}
            >
              {icon.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Card Section */}
      <View style={styles.cardSection}>
        <FlatList
          data={data[activeTab] || []}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    margin: 10,
    backgroundColor: '#673AB7',
    borderRadius: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeIconWrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  iconLabel: {
    marginTop: 3,
    fontSize: 12,
    textAlign: 'center',
  },
  cardSection: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1B24',
    borderRadius: 10,
    padding: 15,
    flex: 0.48,
  },
  cardTitle: {
    color: '#BDBDBD',
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default StatusDetail;
