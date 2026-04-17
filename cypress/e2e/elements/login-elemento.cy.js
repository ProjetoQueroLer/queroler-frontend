class LoginElemento {
  emailCampo = () => '#email';
  senhaCampo = () => '#senha';
  entrarBotao = () => '[data-testid="login-submit-button"]';
  cadastreLink = () => 'a[href="/register"]';
  emailInvalidoMensagem = () => '[role="alert"]';
}

export default LoginElemento;
