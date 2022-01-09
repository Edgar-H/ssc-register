const IS_DEV = process.env.REACT_APP_MODE_DEV;

// export const dbUsers = IS_DEV ? 'userstest' : 'users';
export const dbUsers = 'users';
export const dbProfiles = IS_DEV ? 'profilestest' : 'profiles';
export const dbCounter = IS_DEV ? 'countertest' : 'counter';

export const dbTasks = IS_DEV ? 'taskstest' : 'tasks';
