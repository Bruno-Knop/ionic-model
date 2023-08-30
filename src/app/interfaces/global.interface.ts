export interface IResult<T> {
  message: string;
  success: boolean;
  data: T;
}

export interface HttpErrorResponse {
  method: string;
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  type: number;
}

export interface IControlsList {
  control: string;
  text: string;
}

export class IDictionary {
  headerMenu = 'Ionic Model';
  titleModel = 'Modelo';
  titleDate = 'Data';
  titleNew = 'Novo';
  btnAccess = 'Acessar';
  btnLogout = 'Sair';
  btnConfirm = 'Confirmar';
  btnAdvance = 'Avançar';
  btnNext = 'Próximo';
  btnPrevious = 'Anterior';
  btnBack = 'Voltar';
  btnNot = 'Não';
  btnYes = 'Sim';
  btnCancel = 'Cancelar';
  btnSave = 'Salvar';
  placeholderSearchbar = 'Pesquisa';
  loading = 'Carregando...';
  loadingWait = 'Aguarde...';
  loadingUpdate = 'Atualizando...';
  loadingSend = 'Enviando...';
  toastNotConnection = 'Não há conexão com a internet!';
  toastConnection = 'Conectado há internet';
  toastUsernameInvalid = 'Campo Usuário é obrigatório!';
  toastPasswordInvalid = 'Campo Senha é obrigatório!';
  toastLoginInvalid = 'Usuário ou senha está incorreto!';
}
