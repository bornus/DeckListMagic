import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';

import { RootState } from 'authentificatedPages/rootReducer';
import { EditIcon, TrashIcon } from 'components/SVGs';
import { Project } from 'features/ClientCredentials/types';
import UpdateProjectModal from 'features/ClientCredentials/UpdateProjectModal';
import {
  setUpdateProjectModalOpened,
  setDeleteProjectModalOpened,
  setSelectedProject,
} from 'features/ClientCredentials/slice';

import styles from './project-list.module.scss';

export default function ProjectList(): JSX.Element {
  const dispatch = useDispatch();
  const { projects, updateModal } = useSelector((state: RootState) => state.clientCredentials);
  const { opened: openUpdateModal } = updateModal;

  const onUpdateProject = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(setUpdateProjectModalOpened(true));
  };

  const onDeleteProject = (project: Project) => {
    dispatch(setSelectedProject(project));
    dispatch(setDeleteProjectModalOpened(true));
  };

  return (
    <>
      <ul className={styles.listContainer}>
        {projects.map((project, i) => {
          const { name, clientId, creationDate } = project;
          return (
            <li key={i} className={styles.row}>
              <div className="d-flex justify-content-between mb-3">
                <span className={styles.name}>{name}</span>{' '}
                <span className={styles.date}>{moment(creationDate).format('DD/MM/YYYY HH:mm')}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>
                  <span className={classnames(styles.clientId, 'mr-3')}>Client ID</span>
                  <span className={styles.key}>{clientId}</span>
                </span>
                <span>
                  <EditIcon width="23px" height="23px" className="mr-2" onClick={() => onUpdateProject(project)} />
                  <TrashIcon width="23px" height="23px" onClick={() => onDeleteProject(project)} />
                </span>
              </div>
            </li>
          );
        })}
        <UpdateProjectModal open={openUpdateModal} />
      </ul>
    </>
  );
}
