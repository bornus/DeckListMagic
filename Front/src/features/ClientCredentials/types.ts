import { Moment } from 'moment';

export interface Project {
  id: string;
  name: string;
  clientId: string;
  clientSecret: string;
  creationDate: Moment;
}

export interface ClientCredentials {
  projects: Project[];
  loading?: boolean;
  error?: Error;
  addModal: ModalState & AddModalState;
  updateModal: ModalState;
  deleteModal: ModalState & DeleteModalState;
  selectedProject?: Project;
}

export interface Error {
  code: string;
  name: string;
  message: string;
}

export interface ModalState {
  loading?: boolean;
  error?: Error;
  opened: boolean;
}

export interface AddModalState {
  credentials?: Credentials;
}

export interface DeleteModalState {
  deletionSucceeded?: boolean;
}

export interface Credentials {
  clientId: string;
  clientSecret: string;
  apiKey: string;
}
