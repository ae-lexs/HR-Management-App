import React, { memo, Fragment, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Components
import NavBar from '../../components/NavBar';
import DrawerActions from '../../components/DrawerActions';
import TeamList from '../../components/TeamList';
import AddNewDialog from '../../components/AddNewDialog';
import EmployeeDialog from '../../components/EmployeeDialog';

// Action Crators
import {
  requestAddPosition,
  requestAddTeam,
} from '../../store/modules/employeeUtils/actionCreators';

// Styles
import './Dashboard.css';

const Dashboard = memo(() => {
  const dispatch = useDispatch();

  const isAdmin = useSelector(state => state.user.get('isAdmin'));

  // States
  const [drawerActionsIsOpen, setDrawerActionsIsOpen] = useState(false);
  const [positionDialogIsOpen, setPositionDialogIsOpen] = useState(false);
  const [teamDialogIsOpen, setTeamDialogIsOpen] = useState(false);
  const [employeeDialogIsOpen, setEmployeeDialogIsOpen] = useState(false);

  // Callbacks
  const changeDrawerIsOpen = useCallback(() => {
    setDrawerActionsIsOpen(currentState => !currentState);
  }, [setDrawerActionsIsOpen]);

  const changePositionDialogIsOpen = useCallback(() => {
    setPositionDialogIsOpen(currentState => !currentState);
  }, [setPositionDialogIsOpen]);

  const changeTeamDialogIsOpen = useCallback(() => {
    setTeamDialogIsOpen(currentState => !currentState);
  }, [setTeamDialogIsOpen]);

  const changeEmmployeeDialogIsOpen = useCallback(() => {
    setEmployeeDialogIsOpen(currentState => !currentState);
  }, [setEmployeeDialogIsOpen]);

  const dispatchAddPosition = useCallback(
    positionName => {
      dispatch(requestAddPosition(positionName));
    },
    [dispatch],
  );

  const dispatchAddTeam = useCallback(
    teamName => {
      dispatch(requestAddTeam(teamName));
    },
    [dispatch],
  );

  return (
    <Fragment>
      <DrawerActions
        isOpen={drawerActionsIsOpen}
        closeDrawerActions={changeDrawerIsOpen}
        openPositionDialog={changePositionDialogIsOpen}
        openTeamDialog={changeTeamDialogIsOpen}
        openEmployeeDialog={changeEmmployeeDialogIsOpen}
      />

      {isAdmin === true && (
        <Fragment>
          <AddNewDialog
            isOpen={positionDialogIsOpen}
            title="Position"
            closeDialog={changePositionDialogIsOpen}
            request={dispatchAddPosition}
          />

          <AddNewDialog
            isOpen={teamDialogIsOpen}
            title="Team"
            closeDialog={changeTeamDialogIsOpen}
            request={dispatchAddTeam}
          />

          <EmployeeDialog
            isOpen={employeeDialogIsOpen}
            closeDialog={changeEmmployeeDialogIsOpen}
          />
        </Fragment>
      )}

      <NavBar
        openDrawerActions={changeDrawerIsOpen}
        openPositionDialog={changePositionDialogIsOpen}
        openTeamDialog={changeTeamDialogIsOpen}
        openEmployeeDialog={changeEmmployeeDialogIsOpen}
      />

      {isAdmin === true && <TeamList />}
    </Fragment>
  );
});

export default Dashboard;
