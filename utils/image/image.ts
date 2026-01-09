import { UploadFile } from "@/domain/types/upload-file";
import {
  ImageManipulator,
  ImageResult,
  SaveFormat,
} from "expo-image-manipulator";
import { ImagePickerAsset } from "expo-image-picker";
import { ShareIntentFile } from "expo-share-intent";
import { Platform } from "react-native";

export type ImageSource = ImagePickerAsset | ShareIntentFile;

const isImagePickerAsset = (asset: ImageSource): asset is ImagePickerAsset => {
  return "fileName" in asset;
};

export namespace ImageUtils {
  async function getImageUri(asset: ImageSource): Promise<string> {
    if ("uri" in asset) {
      return asset.uri;
    }

    return Platform.OS === "android" ? `file://${asset.path}` : asset.path;
  }

  export async function normalizeAssetToUploadFile(
    asset: ImageSource,
  ): Promise<UploadFile> {
    const uri = await getImageUri(asset);
    const image = await ImageUtils.toImage(uri);

    if (isImagePickerAsset(asset)) {
      return {
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
        type: asset.mimeType ?? "image/jpeg",
        name: asset.fileName ?? "upload.jpg",
      };
    }

    return {
      uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      type: asset.mimeType ?? "image/jpeg",
      name: "upload.jpg",
    };
  }

  export async function toImage(uri: string): Promise<ImageResult> {
    const manipulator = ImageManipulator.manipulate(uri);
    const imageRef = await manipulator.renderAsync();

    const result = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: 0.1,
    });

    return result;
  }
}
