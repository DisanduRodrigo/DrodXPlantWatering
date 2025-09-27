import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  } from 'react-native';

const MonitoringScreen = () => {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');

  useEffect(() => {
    // Simulate fetching data from a sensor or API
    const fetchData = () => {
      setTemperature(25); // Example temperature in °C
      setHumidity(60); // Example humidity in %
    };
    fetchData();
  }, []);

  const getEnvironmentTip = () => {
    if (temperature > 30) return 'It’s too hot! Water your plants more frequently.';
    if (humidity < 40) return 'Low humidity! Consider misting your plants.';
    return 'Conditions are ideal for your plants.';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GreenCare</Text>
        <Text style={styles.subtitle}>Environment Monitoring</Text>
      </View>

      {/* Temperature and Humidity Display */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          {/* <Image source={require('./assets/thermometer.png')} style={styles.icon} /> */}
          <Text style={styles.value}>{temperature}°C</Text>
          <Text style={styles.label}>Temperature</Text>
        </View>
        <View style={styles.statCard}>
          {/* <Image source={require('./assets/humidity.png')} style={styles.icon} /> */}
          <Text style={styles.value}>{humidity}%</Text>
          <Text style={styles.label}>Humidity</Text>
        </View>
      </View>

      {/* Environment Tips */}
      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Environment Tip</Text>
        <Text style={styles.tipText}>{getEnvironmentTip()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6fcf97',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  tipsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#eaf9ea',
    borderRadius: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
  },
});


export default MonitoringScreen;