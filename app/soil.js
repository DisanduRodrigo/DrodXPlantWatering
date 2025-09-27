import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const Soil = () => {
  const [moistureLevel, setMoistureLevel] = useState(0); // Default moisture level (initial state)
  const [pumpOn, setPumpOn] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch("http://192.168.100.216/water");
        if (response.ok) {
          const data = await response.json();
          setMoistureLevel(data.water);

        }else{
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log("Error fetching data:");
      }
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup
  }, []);


  // Animation for button feedback
  const buttonScale = new Animated.Value(1);



  async function handlePumpToggle() {


    if (!pumpOn) {
      // If the pump is turned on, increase the moisture level
      // setMoistureLevel((prevLevel) => Math.min(prevLevel + 10, 100)); // Increase but not above 100



      setPumpOn(true);  
      // Turn on 
      console.log("Pump turned on"); 

      try {
        const response = await fetch("http://192.168.100.216?status=1");
        if (response.ok) {
          // console.log("Pump turned on");
        }else{
          console.log("Something went wrong");
        }
      } catch (error) {
        console.log("Error turning on pump:");
      }

    } else {
      // If the pump is turned off, decrease the moisture level
      // setMoistureLevel((prevLevel) => Math.max(prevLevel - 10, 0)); // Decrease but not below 0
      console.log("Pump turned off");
      setPumpOn(false);

      try {
        const response = await fetch("http://192.168.100.216?status=2");
        if (response.ok) {
          // console.log("Pump turned off");

        }
      } catch (error) {
         console.log("Pump turned off");

      }

    }

  }

  // Function to toggle pump state and adjust moisture level
  // const handlePumpToggle = async () => {
  //   Animated.sequence([
  //     Animated.timing(buttonScale, {
  //       toValue: 0.9,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }),
  //     Animated.timing(buttonScale, {
  //       toValue: 1,
  //       duration: 100,
  //       useNativeDriver: true,
  //     }),
  //   ]).start(async () => {
  //     setPumpOn(async (prev) => {
  //       const newState = !prev;
  //       if (newState) {
  //         // If the pump is turned on, increase the moisture level
  //         // setMoistureLevel((prevLevel) => Math.min(prevLevel + 10, 100)); // Increase but not above 100

  //         const response = await fetch("http://192.168.100.216?status=1");
  //         if (response.ok) {
  //           console.log("Pump turned on");
  //         }


  //       } else {
  //         // If the pump is turned off, decrease the moisture level
  //         // setMoistureLevel((prevLevel) => Math.max(prevLevel - 10, 0)); // Decrease but not below 0

  //         setPumpOn(true);

  //         const response = await fetch("http://192.168.100.216?status=2");
  //         if (response.ok) {
  //           console.log("Pump turned off");

  //         }
  //       }
  //       return newState;
  //     });
  //   });
  // };

  // Calculate stroke offset for circular gauge
  const strokeWidth = 15;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (moistureLevel / 100) * (circumference * (300 / 360));

  // Dynamic stroke color based on moisture level
  const getStrokeColor = () => {
    if (moistureLevel <= 30) {
      return "#FF6B6B"; // Red for low moisture (0-30%)
    } else if (moistureLevel <= 70) {
      return "#FF9F00"; // Orange/Yellow for moderate moisture (30-70%)
    } else {
      return "#6AB04A"; // Green for high moisture (70-100%)
    }
  };

  const strokeColor = getStrokeColor();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Soil Moisture Monitor</Text>

      {/* Circular Gauge */}
      <View style={styles.gaugeContainer}>
        <Svg width="200" height="200" viewBox="0 0 200 200">
          {/* Background Circle */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#E0E0E0"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (60 / 360)}
            transform="rotate(120, 100, 100)"
          />
          {/* Progress Circle with dynamic color */}
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke={strokeColor} // Apply dynamic color based on moisture level
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(120, 100, 100)"
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.gaugeText}>{moistureLevel.toFixed(0)}%</Text>
      </View>

      {/* Water Pump Button */}
      <TouchableOpacity
        style={[
          styles.pumpButton,
          pumpOn ? { backgroundColor: "#FF6B6B" } : { backgroundColor: "#6AB04A" },
        ]}
        activeOpacity={0.8}
        onPress={handlePumpToggle}
      >
        <Animated.Text style={[styles.buttonText, { transform: [{ scale: buttonScale }] }]}>
          {pumpOn ? "Turn Off Pump" : "Turn On Pump"}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF1",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6AB04A",
    marginBottom: 20,
  },
  gaugeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  gaugeText: {
    position: "absolute",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  pumpButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default Soil;
