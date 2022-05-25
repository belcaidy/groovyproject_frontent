import {SpectreStatus} from './spectre-status.enum';

export interface Company {
  CompanyId: number;
  CompanyName: string;
  CompanyDescription: string;
  DateCreated: string;
  DateUpdated: string;
  Status: SpectreStatus.ACTIVE;
}

export interface SaleAdd {
  id: number;
  dateCreated: string;
  description: string;
  longDescription: string;
  price: string;
  title: string;
  lastUpdated: string;
  reservation: string;
  images: [];
}


export interface Announce {
  id: number;
  dateCreated: string;
  subTitle: string;
  description: string;
  longDescription: string;
  price: string;
  title: string;
  lastUpdated: string;
  illustrations: [];
}

export interface User {
  id: number;
  username: string;
  role: string;
  status: string;
  password: string;
}
