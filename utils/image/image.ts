import {
  ImageManipulator,
  ImageResult,
  SaveFormat,
} from "expo-image-manipulator";
import { ImagePickerAsset } from "expo-image-picker";

export namespace ImageUtils {
  export async function toImage(asset: ImagePickerAsset): Promise<ImageResult> {
    const manipulator = ImageManipulator.manipulate(asset.uri);
    const imageRef = await manipulator.renderAsync();

    const result = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: 0.1,
    });

    return result;
  }
}
