export type UploadAsset = {
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  name: string;
  mimeType: string;
  size?: number;
  uri: string;
};
