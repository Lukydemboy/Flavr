import { Asset } from '@/domain/types/asset';
import { UploadAsset } from '@/domain/types/upload-file';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type PresignedUrl = { url: string; assetId: string };

export const useUploadInternalAsset = () => {
  return useMutation({
    mutationFn: async (asset: UploadAsset) => {
      const { mimeType, size, type = 'INTERNAL' } = asset;

      return axios<PresignedUrl>({
        method: 'POST',
        url: `/assets`,
        data: { mimeType, size, type },
      })
        .then(async ({ data: { url, assetId } }) => {
          const response = await fetch(asset.uri);
          const blob = await response.blob();

          await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': mimeType },
            body: blob,
          })
            .then(async res => {
              if (!res.ok) {
                const text = await res.text();
                console.error(text);
              }
            })
            .catch(err => {
              console.error(err);
            });

          return assetId;
        })
        .then(async assetId =>
          axios<Asset>({
            method: 'POST',
            url: `/assets/${assetId}`,
          }).then(res => res.data),
        );
    },
  });
};

async function uriToBlob(uri: string): Promise<Blob> {
  const response = await fetch(uri);
  return await response.blob();
}
