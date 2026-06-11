export class CadastrarLeitorElements {
  static readonly logoQueroLer = '.mt-10.h-auto.w-auto.select-none.mx-auto';
  static readonly tituloCrieSuaConta = '.mb-8';
  static readonly registrarButton = '[data-testid="register-link"]';
  static readonly nomeInput = '[data-testid="input-nome"]';
  static readonly emailInput = '[data-testid="input-email"]';
  static readonly senhaInput = '[data-testid="input-senha"]';
  static readonly confirmaSenhaInput = '[data-testid="input-confirmarSenha"]';
  static readonly cpfUsuarioInput = '[data-testid="input-cpf"]';
  static readonly dataDeNascimentoInput =
    '[data-testid="input-data-nascimento"]';
  static readonly aceitoOsTermosCheckbox =
    '.relative.flex.items-center.justify-center';
  static readonly aceitoOsTermosLabel = '.text-xs.text-zinc-300';
  static readonly cadastrarButton = '[data-testid="register-submit-button"]';
  static readonly erroMensagemToastLabel =
    '.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--error';
  static readonly sucessoMensagemToastLabel =
    '.Toastify__toast.Toastify__toast-theme--light.Toastify__toast--success';
  static readonly campoObrigatorioLabel = '.mt-1.text-xs.text-red-400';
}
