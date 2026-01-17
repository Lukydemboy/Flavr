import { UploadAsset } from '@/domain/types/upload-file';
import { ImageManipulator, ImageResult, SaveFormat } from 'expo-image-manipulator';
import { ImagePickerAsset } from 'expo-image-picker';
import { ShareIntentFile } from 'expo-share-intent';
import { Platform } from 'react-native';

export type ImageSource = ImagePickerAsset | ShareIntentFile;

const isImagePickerAsset = (asset: ImageSource): asset is ImagePickerAsset => {
  return 'fileName' in asset;
};

export namespace ImageUtils {
  async function getImageUri(asset: ImageSource): Promise<string> {
    if ('uri' in asset) {
      return asset.uri;
    }

    return Platform.OS === 'ios' ? `file://${asset.path}` : asset.path;
  }

  export async function normalizeAssetToUploadFile(asset: ImageSource): Promise<UploadAsset> {
    const uri = await getImageUri(asset);
    const image = await ImageUtils.toImage(uri);

    return {
      uri: image.uri,
      mimeType: 'image/jpeg',
      name: 'upload.jpg',
      type: 'IMAGE',
    };
  }

  export async function toImage(uri: string): Promise<ImageResult> {
    const manipulator = ImageManipulator.manipulate(uri);
    const imageRef = await manipulator.renderAsync();

    const result = await imageRef.saveAsync({
      format: SaveFormat.JPEG,
      compress: 0.4,
      base64: false,
    });

    return result;
  }

  export function base64ByteSize(base64: string): number {
    const padding = (base64.match(/=+$/) || [''])[0].length;
    return (base64.length * 3) / 4 - padding;
  }
}
