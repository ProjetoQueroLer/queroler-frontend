'use client';

import {
  AuthStepEnum,
  AUTH_STEP_COMPONENTS,
} from '@/presentation/shared/ui-model/authenticationFlow';

export function AuthStep() {
  const isLoggedIn = true; //TODO: Implementar lógica de autenticação;
  const currentStep = isLoggedIn ? AuthStepEnum.INITIAL : AuthStepEnum.LOGIN;
  const StepComponent = AUTH_STEP_COMPONENTS[currentStep];

  return <StepComponent />;
}
