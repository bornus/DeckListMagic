
export interface ConfigHandler {
  loading?: boolean;
  error?: Error;
  saveModal: ModalState;
}
export interface ModalState {
  loading?: boolean;
  error?: Error;
  opened: boolean;
}
