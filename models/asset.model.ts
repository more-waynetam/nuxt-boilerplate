export interface IAsset {
  _id?: string;
  name: string;
  uri: string;
  type?: string;
  provider?: string;
  progress: string;
  threadId: string;
  createdBy?: string;
  createdAt?: Date;
  extra?: any;
}
