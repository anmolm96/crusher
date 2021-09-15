import { atom } from 'jotai';
import { userAtom } from '@store/atoms/global/user';
import { teamAtom } from '@store/atoms/global/team';
import { systemConfigAtom } from '@store/atoms/global/systemConfig';
import { projectsAtom } from '@store/atoms/global/project';
import { USER_META_KEYS } from '@constants/USER';
import { appStateAtom, appStateItemMutator } from '@store/atoms/global/appState';

interface UserInitialData {
	userData:any;
	 team:any; system:any; projects:any;
}

export const updateInitialDataMutator = atom(null, (_get, _set, data: UserInitialData) => {
	_set(userAtom,data.userData)
	_set(teamAtom, data.team);
	_set(systemConfigAtom, data.system);
	_set(projectsAtom, data.projects)
})

export const selectInitialProjectMutator = atom(null,(_get, _set,data: UserInitialData)=>{
	const { userData, projects } = data;
	const selectedProjectId = userData?.meta?.[USER_META_KEYS.SELECTED_PROJECT_ID] ?? projects?.[0].id;
	_set(appStateItemMutator, { key: "selectedProjectId", value: selectedProjectId })

})