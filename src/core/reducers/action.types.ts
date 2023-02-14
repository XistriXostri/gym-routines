export const userActionTypes = {
    set: 'user@set',
    remove: 'user@remove',
    loadRoutines: 'user@loadRoutines',
    addRoutine: 'user@addRoutine',
    deleteRoutine: 'user@deleteRoutine',
};

export const routineActionTypes = {
    load: 'routine@load',
    add: 'routine@add',
    update: 'routine@update',
    delete: 'routine@delete',
    setCurrent: 'routine@setCurrent',
    removeCurrent: 'routine@removeCurrent',
    editMode: 'routine@editMode',
};

export const sesionActionTypes = {
    add: 'sesion@add',
    update: 'sesion@update',
    delete: 'sesion@delete',
    setCurrent: 'sesion@setCurrent',
};

export const exerciseActionTypes = {
    add: 'exercise@add',
    update: 'exercise@update',
    delete: 'exercise@delete',
    setCurrent: 'exercise@setCurrent',
};
