import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Animated, Easing, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 

export default function Home() {
  const [tempreture, setTempreture] = useState("N/A");
  const [humidity, setHum] = useState("N/A");
  const [water, setsoiilWaterLevel] = useState("N/A");


  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("http://192.168.100.216/temp");
        if (response.ok) {
          const data = await response.json();
          setTempreture(data.temp);
          setHum(data.humidity);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("http://192.168.100.216/water");
        if (response.ok) {
          const data = await response.json();
          setsoiilWaterLevel(data.water);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  const rotateValue = new Animated.Value(0);
  const router = useRouter();

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const navigateToSoil = () => {
    router.push("/soil");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Room Monitor</Text>

      <View style={styles.card}>
        <Image source={{ uri: "https://img.icons8.com/fluency/96/thermometer.png" }} style={styles.icon} />
        <Text style={styles.label}>Temperature</Text>
        <Text style={styles.value}>{tempreture}°C</Text>
        <Animated.View style={[styles.indicator, { transform: [{ rotate }] }]} />
      </View>

      <View style={styles.card}>
        <Image source={{ uri: "https://img.icons8.com/fluency/96/humidity.png" }} style={styles.icon} />
        <Text style={styles.label}>Humidity</Text>
        <Text style={styles.value}>{humidity}%</Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={navigateToSoil}>
        <Image source={{ uri: "https://img.icons8.com/fluency/96/soil.png" }} style={styles.icon} />
        <Text style={styles.label}>Soil Moisture</Text>
        <Text style={styles.value}>{water}%</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF1",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 28,
    color: "#6AB04A",
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
  },
  label: {
    fontSize: 18,
    color: "#6AB04A",
    marginTop: 10,
  },
  value: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
    marginTop: 5,
  },
  icon: {
    width: 60,
    height: 60,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#6AB04A",
    marginTop: 10,
  },
});
