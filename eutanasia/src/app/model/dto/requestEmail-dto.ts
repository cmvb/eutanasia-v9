export interface RequestEMailDTOModel {
    desde;
    para: string[];
    asunto;
    parametros: Map<string, string>;
}