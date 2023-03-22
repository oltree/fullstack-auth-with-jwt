import { RegistrationState } from './registrationSlice';

type RegistrationSelector = {
  registration: RegistrationState;
};

export const registrationSelector = (state: RegistrationSelector) =>
  state.registration;
