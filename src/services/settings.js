const IS_DEV = process.env.REACT_APP_MODE_DEV;

export const DB_USERS = IS_DEV === true ? 'userstest' : 'users';
export const DB_PROFILES = IS_DEV === true ? 'profilestest' : 'profiles';
export const DB_COUNTER = IS_DEV === true ? 'counttest' : 'count';
