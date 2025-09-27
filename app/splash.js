import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";

const SplashScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Fading logo
  const [scaleAnim] = useState(new Animated.Value(0.5)); // Scaling text
  const [progress] = useState(new Animated.Value(0)); // Circular progress

  const [progressText, setProgressText] = useState(0); // Text progress percentage

  useEffect(() => {
    // Logo fade-in, scale, and progress bar animation
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false, // Needed for interpolating progress values
      }),
    ]).start();

    // Update progress text
    progress.addListener(({ value }) => {
      setProgressText(Math.floor(value * 100));
    });

    // Cleanup listener
    return () => {
      progress.removeAllListeners();
    };
  }, []);

  const interpolateRotation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const loadingBarWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.logoText}>🌱 Soil Monitor</Text>
      </Animated.View>

      {/* Circular Animated Loader */}
      <Animated.View
        style={{
          transform: [{ rotate: interpolateRotation }],
          marginBottom: 20,
        }}
      >
        <View style={styles.loaderCircle}>
          <View style={[styles.innerCircle]} />
        </View>
      </Animated.View>

      {/* Loading Bar */}
      <View style={styles.loadingBarContainer}>
        <Animated.View
          style={[
            styles.loadingBar,
            { width: loadingBarWidth },
          ]}
        />
      </View>

      {/* Loading Percentage */}
      <Text style={styles.progressText}>{progressText}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF1", // Light green background
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6AB04A", // Vibrant green color
    textAlign: "center",
  },
  loaderCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "#6AB04A", // Green circle loader
    borderTopColor: "#FF9F00", // Orange for dynamic rotation
  },
  innerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8FFF1",
  },
  loadingBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#E0E0E0", // Gray background for the loading bar
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 10,
  },
  loadingBar: {
    height: "100%",
    backgroundColor: "#6AB04A", // Green loading bar
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default SplashScreen;
