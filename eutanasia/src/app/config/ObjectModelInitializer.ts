import { Injectable } from '@angular/core';

export var HOST = 'http://localhost:9002';
//export var HOST = 'http://10.176.56.211:9002';
//export var HOST = 'http://192.168.1.15:9002';

export var SYSTEM = 'http://localhost:4200';
//export var SYSTEM = 'http://10.176.56.211:7001';
//export var SYSTEM = 'http://192.168.1.15:4200';

@Injectable()
export class ObjectModelInitializer {

  constructor() {
  }

  getLocaleESForCalendar() {
    return {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
  };

  getLocaleENForCalendar() {
    return {
      firstDayOfWeek: 1,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"],
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      today: 'Today',
      clear: 'Clear'
    }
  };

  getConst() {
    return {
      // URL'S + Info del Sistema
      urlDomain: `${SYSTEM}/`,
      urlRestService: `${HOST}/`,
      urlRestOauth: `${HOST}/oauth/token`,
      urlVCode: `${SYSTEM}/vCode/`,
      urlConsultarToques: `${HOST}/eutanasia/paratodos/consultarToques`,
      urlConsultarPosts: `${HOST}/eutanasia/paratodos/consultarPosts`,
      urlConsultarComentariosPorIdPost: `${HOST}/eutanasia/paratodos/consultarComentariosPorIdPost`,
      urlConsultarContadorCategoriasPosts: `${HOST}/eutanasia/paratodos/consultarContadorCategoriasPosts`,
      urlConsultarPostsPorFiltros: `${HOST}/eutanasia/paratodos/consultarPostsPorFiltros`,
      urlConsultarTags: `${HOST}/eutanasia/paratodos/consultarTags`,
      urlSubirImagen: `${HOST}/eutanasia/paratodos/subirImagen`,
      tokenUsernameAUTH: 'EutanasiaApp',
      tokenPasswordAUTH: 'Eutanasia2019codex',
      tokenNameAUTH: 'access_token',
      codigoADMIN: 'RMRADM',

      // Model rango de fechas para NGBDatePicker
      minDate: { year: 1000, month: 1, day: 1 },
      maxDate: new Date(),
      formatoFecha: 'dd/mm/yy',
      rangoYears: '1900:3000',

      // Otras Variables
      idiomaEs: 1,
      idiomaEn: 2,
      phaseAdd: 'add',
      phaseDelete: 'delete',
      phaseSearch: 'search',
      phaseEdit: 'edit',
      phasePlus: 'plus',
      tipoCampoTexto: 1,
      tipoCampoEnum: 2,
      disabled: 'disabled',
      readOnly: 'readOnly',
      severity: ['info', 'success', 'warn', 'error'],
      actionModal: { 'show': 1, 'hidde': 2 },
      collectionSize: 0,
      maxSize: 1,
      rotate: true,
      pageSize: 1,
      menuConfiguracion: "C",
      menuAdministracion: "A",
      menuInventario: "I",
      menuAgenda: "G",
      menuMovimientos: "M",
      estadoActivoNumString: 1,
      estadoInactivoNumString: 0
    }
  };

  getDataServiceSesion() {
    return {
      // data
      phase: '',
      usuarioSesion: '',
      usuarioRegister: '',
      tokenSesion: '',
      decodedToken: '',
      expirationDate: '',
      idioma: '',

      // Excepciones
      mensajeError403: '',
      mensajeError404: '',
      mensajeError500: '',

      // Mensajes
      mensajeConfirmacion: ''
    }
  }

  getTokenSesion() {
    return {
      name: '',
      token: ''
    }
  }

  getDataModeloTablas() {
    return {
      // Campo de la tabla
      field: '',
      // Encabezado
      header: ''
    }
  };

  getDataMessage() {
    return {
      // info, success, warning, danger
      severity: '',
      // Title of MSG
      summary: '',
      // Description of MSG
      detail: ''
    }
  };

  getDataEvento(name, description, image) {
    return {
      nombre: name,
      descripcion: description,
      srcImg: image
    }
  };

  getDataImagenGalleria(nombreImagen, rutaImagen) {
    return {
      previewImageSrc: rutaImagen,
      thumbnailImageSrc: rutaImagen,
      alt: nombreImagen,
      title: nombreImagen
    }
  };

  // Models

  getDataToqueModel() {
    return {
      id: 0,
      nombre: '',
      descripcion: '',
      valorBoleta: 0,
      valorBoletaPromo: 0,
      capacidad: 0,
      ciudad: '',
      urlPoster: '',
      organizador: '',
      fecha: '',
      // Auditoria
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataUsuarioAutorModel() {
    return {
      id: 0,
      nombres: '',
      apellidos: '',
      usuario: '',
      password: '',
      rol: '',
      correo: '',
      fechaNacimiento: '',
      urlImagen: '',
      resena: '',
      // Auditoria
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataPostModel() {
    return {
      id: 0,
      usuarioAutorTB: this.getDataUsuarioAutorModel(),
      titulo: '',
      subtitulo: '',
      articulo: '',
      urlImagen: '',
      correoAutor: '',
      tags: '',
      categoria: 0,
      cantidadComentarios: 0,
      // Auditoria
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataComentarioModel() {
    return {
      id: 0,
      usuarioAutorTB: this.getDataUsuarioAutorModel(),
      postTB: this.getDataPostModel(),
      comentarioRespuestaTB: this.getDataComentarioModel(),
      correoAutor: '',
      comentario: '',
      // Auditoria
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  getDataMeGustaModel() {
    return {
      id: 0,
      usuarioAutorTB: this.getDataUsuarioAutorModel(),
      postTB: this.getDataPostModel(),
      // Auditoria
      estado: 1,
      fechaCreacion: '',
      usuarioCreacion: '',
      fechaActualizacion: '',
      usuarioActualizacion: ''
    }
  };

  // DTO's Models

  getDataCategoriasDtoModel() {
    return {
      invitacionesEvento: 0,
      agradecimientosSaludos: 0,
      criticas: 0,
      freneticoRockNRoll: 0,
      noticiasMundiales: 0
    }
  };

  getDataArchivoDtoModel() {
    return {
      nombreArchivo: '',
      archivo: '',
      rutaArchivo: ''
    }
  };

}