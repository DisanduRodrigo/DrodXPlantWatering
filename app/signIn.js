import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const bounceValue = new Animated.Value(0);

  // Bounce animation on logo
  React.useEffect(() => {
    Animated.spring(bounceValue, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(
    () => {
        async function checkUserInAsyncStorage ()  {
            
            try {
                let userJson = await AsyncStorage.getItem("user");
                if (userJson != null) {
                    router.replace("/home");
                }
            } catch (e) {
                console.log(e);
            }

        }
        checkUserInAsyncStorage ();
    },[]

);
  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.Text
        style={[
          styles.logo,
          { transform: [{ scale: bounceValue.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }] },
        ]}
      >
        Room Monitor
      </Animated.Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A3A3A3"

          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A3A3A3"

          onChangeText={(value) => setPassword(value)}
          secureTextEntry
        />
      </View>

      {/* Sign-In Button */}
      <TouchableOpacity style={styles.button}
        onPress={
          async () => {

         
            let formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);


            let response = await fetch("http://192.168.100.210:8080/DrodX_soil_moisture/SignIn",
              {
                method: "POST",
                body: JSON.stringify(
                  {
                    email: email,
                    password: password,
                  }
                ),
                headers: {
                  "Content-Type": "application/json",
                }

              }
            );

            if (response.ok) {
              let json = await response.json();

              if (json.success) {
                //user sign in success
                let user = json.user;
                  await AsyncStorage.setItem("user", JSON.stringify(user));
                    router.replace("/home");

              } else {
                //problem occured
                Alert.alert("Error", json.message);
              }
            }
          }
        }>

        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign-Up Option */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text style={styles.signupLink}>Sign Up</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FFF1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6AB04A",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 15,
    marginBottom: 10,
    fontSize: 16,
    borderColor: "#6AB04A",
    borderWidth: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  button: {
    backgroundColor: "#6AB04A",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#7D7D7D",
  },
  signupLink: {
    color: "#6AB04A",
    fontWeight: "bold",
  },
});
