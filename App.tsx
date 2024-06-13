import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import scanMeImage from "./assets/scanMe.png";

export default function App() {
  const [cameraType, setCameraType] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  if (!permission) {
    // camera permission are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setCameraType((current) => (current === "back" ? "front" : "back"));
  };

  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    setShowCamera(false);
  };

  return (
    <View style={styles.container}>
      {showCamera && (
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={styles.camera}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
      {/* <Button
        title={showCamera ? "Hide Camera" : "Show Camera"}
        onPress={() => setShowCamera(!showCamera)}
      /> */}
      <TouchableOpacity
        style={styles.scanBox}
        onPress={() => setShowCamera(!showCamera)}
      >
        <Image style={styles.scanImage} source={scanMeImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scanBox: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    backgroundColor: "white",
  },
  scanImage: {
    width: 175,
    height: 175,
  },
});
