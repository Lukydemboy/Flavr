import { useState } from "react";
import { Alert, Image, View, StyleSheet, Pressable } from "react-native";
import * as _ImagePicker from "expo-image-picker";
import UploadIcon from "../icons/Upload";
import { ImagePickerAsset } from "expo-image-picker";

type ImagePickerProps = {
  onImagePicked: (image: ImagePickerAsset) => void;
};

export default function ImagePicker({ onImagePicked }: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await _ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await _ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImagePicked(result.assets[0]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        className="border-4 border-gray-300 w-full p-4 py-8 flex items-center justify-center border-dashed rounded-lg"
        onPress={pickImage}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="rounded-3xl"
            style={styles.image}
          />
        ) : (
          <UploadIcon />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
