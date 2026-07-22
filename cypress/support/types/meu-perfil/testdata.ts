export type EstruturaData = {
  camposDoMeuPerfil: {
    nomeCompleto: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};

export type VisualizarPerfil = {
  meuPerfil: {
    nome: string;
    email: string;
    cpf: string;
    dataDeNascimento: string;
    cidade: string;
    estado: string;
    pais: string;
  };
};
