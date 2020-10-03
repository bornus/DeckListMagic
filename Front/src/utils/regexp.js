export const emailRegex = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+[.][A-Z]{2,}$', 'i');
export const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^$*.[]{}()?-“!@#%&/,><’:;|_~`])S{6,99}$',
);
