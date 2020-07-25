import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { AppThunk, AppDispatch } from 'authentificatedPages/store';
import { RootState } from 'authentificatedPages/rootReducer';
import { Project, ClientCredentials, Error } from 'features/ClientCredentials/types';

const modalInitialState = {
  loading: false,
  error: undefined,
  opened: false,
};

const initialState: ClientCredentials = {
  projects: [],
  loading: false,
  error: undefined,
  addModal: {
    ...modalInitialState,
    credentials: undefined,
  },
  updateModal: modalInitialState,
  deleteModal: modalInitialState,
  selectedProject: undefined,
};

const authSlice = createSlice({
  name: 'clientCredentials',
  initialState,
  reducers: {
    listProjects(state: ClientCredentials) {
      state.loading = true;
    },
    listProjectsSuccess(state: ClientCredentials, action: PayloadAction<Project[]>) {
      state.loading = false;
      state.projects = action.payload;
    },
    listProjectsError(state: ClientCredentials, action: PayloadAction<Error>) {
      state.loading = false;
      state.projects = [];
      state.error = action.payload;
    },
    addProject(state: ClientCredentials) {
      state.addModal.loading = true;
    },
    addProjectSuccess(state: ClientCredentials, action: PayloadAction<Project>) {
      state.addModal.loading = false;
      state.projects.push(action.payload);
      state.addModal.credentials = {
        clientId: action.payload.clientId,
        clientSecret: action.payload.clientSecret,
        apiKey: 'api key',
      };
    },
    addProjectError(state: ClientCredentials, action: PayloadAction<Error>) {
      state.addModal.loading = false;
    },
    setAddProjectModalOpened(state: ClientCredentials, action: PayloadAction<boolean>) {
      state.addModal = {
        ...modalInitialState,
        opened: action.payload,
      };
    },
    updateProject(state: ClientCredentials) {
      state.updateModal.loading = true;
    },
    updateProjectSuccess(state: ClientCredentials, action: PayloadAction<Project[]>) {
      state.updateModal.loading = false;
      state.updateModal.opened = false;
      state.projects = action.payload;
    },
    updateProjectError(state: ClientCredentials, action: PayloadAction<Error>) {
      state.updateModal.loading = false;
    },
    setUpdateProjectModalOpened(state: ClientCredentials, action: PayloadAction<boolean>) {
      state.updateModal = {
        ...modalInitialState,
        opened: action.payload,
      };

      if (action.payload === false) state.selectedProject = undefined;
    },
    deleteProject(state: ClientCredentials) {
      state.deleteModal.loading = true;
    },
    deleteProjectSuccess(state: ClientCredentials, action: PayloadAction<Project[]>) {
      state.deleteModal.loading = false;
      state.deleteModal.deletionSucceeded = true;
      state.projects = action.payload;
    },
    deleteProjectError(state: ClientCredentials, action: PayloadAction<Error>) {
      state.deleteModal.loading = false;
    },
    setDeleteProjectModalOpened(state: ClientCredentials, action: PayloadAction<boolean>) {
      if (action.payload === true) {
        state.deleteModal = {
          ...modalInitialState,
          deletionSucceeded: undefined,
          opened: action.payload,
        };
      } else {
        state.selectedProject = undefined;
        state.deleteModal.opened = action.payload;
      }
    },
    setSelectedProject(state: ClientCredentials, action: PayloadAction<Project>) {
      state.selectedProject = action.payload;
    },
  },
});

export const {
  setAddProjectModalOpened,
  setUpdateProjectModalOpened,
  setDeleteProjectModalOpened,
  setSelectedProject,
} = authSlice.actions;

export default authSlice.reducer;

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const listProjects = (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(authSlice.actions.listProjects());
    // await timeout(0);
    const { projects } = getState().clientCredentials;
    dispatch(authSlice.actions.listProjectsSuccess(projects));
  } catch (e) {
    dispatch(authSlice.actions.listProjectsError(e));
  }
};

export const addProject = (name: string): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.addProject());
    await timeout(1000);
    const id = uuidv4();
    const project: Project = {
      id,
      name,
      creationDate: moment(),
      clientId: id,
      clientSecret: '1chc7n14n5lidpuvpsv3i1iom1glqqc538mnl6uc58r25alhkgsd',
    };
    dispatch(authSlice.actions.addProjectSuccess(project));
  } catch (e) {
    dispatch(authSlice.actions.addProjectError(e));
  }
};

export const updateProject = (name: string): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(authSlice.actions.updateProject());
    await timeout(1000);
    const { selectedProject, projects } = getState().clientCredentials;
    const projectsList: Project[] = projects.map((p) => {
      if (p.id === selectedProject?.id) {
        return {
          ...p,
          name,
        };
      }

      return p;
    });
    dispatch(authSlice.actions.updateProjectSuccess(projectsList));
  } catch (e) {
    dispatch(authSlice.actions.updateProjectError(e));
  }
};

export const deleteProject = (): AppThunk => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    dispatch(authSlice.actions.deleteProject());
    await timeout(1000);
    const { selectedProject, projects } = getState().clientCredentials;
    const projectList = projects.filter((p) => p.id !== selectedProject?.id);
    dispatch(authSlice.actions.deleteProjectSuccess(projectList));
  } catch (e) {
    dispatch(authSlice.actions.deleteProjectError(e));
  }
};
