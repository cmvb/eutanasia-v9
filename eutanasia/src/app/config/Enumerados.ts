import { Injectable } from '@angular/core';
import { TextProperties } from './TextProperties';
import { SesionService } from '../services/sesionService/sesion.service';


@Injectable()
export class Enumerados {

  constructor(public textProperties: TextProperties, public sesionService: SesionService) {
  }

  getEnumerados() {
    let properties = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);

    return {
      sino: {
        cod: 1, valores: [
          { value: 0, label: properties.lbl_enum_no },
          { value: 1, label: properties.lbl_enum_si }
        ]
      },
      sexo: {
        cod: 2, valores: [
          { value: 0, label: properties.lbl_enum_generico_valor_vacio },
          { value: 1, label: properties.lbl_enum_sexo_valor_masculino },
          { value: 2, label: properties.lbl_enum_sexo_valor_femenino },
          { value: 3, label: properties.lbl_enum_sexo_valor_otro }
        ]
      },
      rolUsuario: {
        cod: 3, valores: [
          { value: 0, label: properties.lbl_enum_generico_valor_vacio },
          { value: 1, label: properties.lbl_enum_rol_usuario_valor_administrador },
          { value: 2, label: properties.lbl_enum_rol_usuario_valor_fan },
          { value: 3, label: properties.lbl_enum_rol_usuario_valor_contacto_laboral }
        ]
      },
      estadoUsuario: {
        cod: 4, valores: [
          { value: 0, label: properties.lbl_enum_estado_valor_usuario_inactivo },
          { value: 1, label: properties.lbl_enum_estado_valor_usuario_activo },
          { value: 2, label: properties.lbl_enum_estado_valor_usuario_rechazado }
        ]
      },
      categoriaPost: {
        cod: 5, valores: [
          { value: 0, label: properties.lbl_enum_generico_valor_vacio },
          { value: 1, label: properties.lbl_enum_categoria_valor_invitacion_evento },
          { value: 2, label: properties.lbl_enum_categoria_valor_agradecimientos_saludos },
          { value: 3, label: properties.lbl_enum_categoria_valor_criticas },
          { value: 4, label: properties.lbl_enum_categoria_valor_frenetico_rnr },
          { value: 5, label: properties.lbl_enum_categoria_valor_noticias_mundiales }
        ]
      }
    }
  };
}