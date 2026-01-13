import { AssetSource, AssetType } from '../enums/asset.enum';

export type Asset = {
  id: string;
  source: AssetSource;
  type: AssetType;
  url?: string;
  storageKey?: string;
};
