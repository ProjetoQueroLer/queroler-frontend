export class LoginElements {
  static readonly formContainer = '[data-testid="login-form-container"]';
  static readonly form = '[data-testid="login-form"]';
  static readonly header = '[data-testid="login-header"]';

  static readonly emailInput = '[data-testid="input-email"]';
  static readonly senhaInput = '[data-testid="input-senha"]';
  static readonly submitButton = '[data-testid="login-submit-button"]';

  static readonly forgotPasswordLink = '[data-testid="forgot-password-link"]';
  static readonly registerLink = '[data-testid="register-link"]';
  static readonly registerSection = '[data-testid="register-section"]';

  static readonly errorMessage = '[role="alert"]';

  static readonly showPasswordButton = '[aria-label="Mostrar senha"]';
  static readonly hidePasswordButton = '[aria-label="Ocultar senha"]';
}
