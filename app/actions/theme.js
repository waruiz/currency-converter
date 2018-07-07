import { CHANGE_PRIMARY_COLOR } from './types';

export const changePrimaryColor = color => ({
  type: CHANGE_PRIMARY_COLOR,
  color,
});
