/**
 * URL base da API utilizada pela aplicação.
 * 
 * Durante o desenvolvimento, o sistema utiliza o json-server
 * executando localmente na porta 3001.
 * 
 * Em um ambiente de produção, esse valor pode ser alterado
 * para a URL real da API.
 */
const api_url = "http://localhost:3001";


/**
 * Exporta a URL base para ser utilizada em outros serviços
 * que realizam requisições HTTP.
 */
export default api_url;