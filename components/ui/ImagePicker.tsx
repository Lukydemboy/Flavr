import { useState } from 'react';
import { Alert, Image, View, StyleSheet, Pressable } from 'react-native';
import * as _ImagePicker from 'expo-image-picker';
import UploadIcon from '../icons/Upload';
import { ImagePickerAsset } from 'expo-image-picker';
import { StyledText } from './StyledText';

type ImagePickerProps = {
  onImagePicked: (image: ImagePickerAsset) => void;
};

export default function ImagePicker({ onImagePicked }: ImagePickerProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult = await _ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await _ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      selectionLimit: 1,
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
        className="relative border-4 border-gray-300 w-full p-4 pt-6 flex items-center justify-center border-dashed rounded-lg"
        onPress={pickImage}
      >
        {image ? <Image source={{ uri: image }} className="rounded-3xl" style={styles.image} /> : <UploadIcon />}
        {!image && (
          <StyledText className="text-slate-600 mt-4" weight="bold">
            Select image
          </StyledText>
        )}
        {image && (
          <Pressable
            onPress={() => setImage(null)}
            className="bg-white border-rose-600 border-2 rounded-xl py-2 px-4 mt-4"
          >
            <StyledText className="text-sm text-rose-600" weight="semiBold">
              Remove image
            </StyledText>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 160,
  },
});
