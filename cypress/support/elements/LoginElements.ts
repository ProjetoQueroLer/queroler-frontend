export class LoginElements {
  static readonly formularioContainerLogin =
    '[data-testid="login-form-container"]';
  static readonly formularioLogin = '[data-testid="login-form"]';
  static readonly cabecalhoLogin = '[data-testid="login-header"]';

  static readonly emailInput = '[data-testid="input-email"]';
  static readonly senhaInput = '[data-testid="input-senha"]';
  static readonly entrarButton = '[data-testid="login-submit-button"]';

  static readonly esqueceuSenhaLink = '[data-testid="forgot-password-link"]';
  static readonly cadastreSeLink = '[data-testid="register-link"]';
  static readonly cadastreSeSecao = '[data-testid="register-section"]';

  static readonly erroMensagem = '[role="alert"]';

  static readonly mostrarSenhaButton = '[aria-label="Mostrar senha"]';
  static readonly ocultarSenhaButton = '[aria-label="Ocultar senha"]';
}
