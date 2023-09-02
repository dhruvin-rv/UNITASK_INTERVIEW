export type RESPONSE = {
  status?: 'ok' | 'fail' | 'auth_fail';
  message?: string;
  data?: any;
  error?: any;
};
