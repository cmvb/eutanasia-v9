import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from './ObjectModelInitializer';


@Injectable()
export class TextProperties {

  constructor(public objectModelInitializer: ObjectModelInitializer) {
  }

  getProperties(idioma) {
    let constant = this.objectModelInitializer.getConst();
    return {
      // Mensajes
      lbl_summary_info: idioma === constant.idiomaEs ? '¡Información!' : 'Info!',
      lbl_summary_success: idioma === constant.idiomaEs ? '¡Exitoso!' : 'Success!',
      lbl_summary_warning: idioma === constant.idiomaEs ? '¡Advertencia!' : 'Warning!',
      lbl_summary_danger: idioma === constant.idiomaEs ? '¡Error!' : 'Error!',
      lbl_summary_unknown_danger: idioma === constant.idiomaEs ? '¡Error Desconocido!' : 'Unknown Error!',
      lbl_detail_fue: idioma === constant.idiomaEs ? ' fue ' : ' has ',
      lbl_detail_el_registro: idioma === constant.idiomaEs ? 'El elemento #' : 'The element #',
      lbl_detail_el_registro_eliminado: idioma === constant.idiomaEs ? 'El elemento fue eliminado satisfactoriamente.' : 'The element was deleted successfully.',
      lbl_detail_creado: idioma === constant.idiomaEs ? 'creado' : 'created',
      lbl_detail_actualizado: idioma === constant.idiomaEs ? 'actualizado' : 'updated',
      lbl_detail_satisfactoriamente: idioma === constant.idiomaEs ? ' satisfactoriamente.' : ' successfully.',

      // Generales
      lbl_login: idioma === constant.idiomaEs ? 'Login' : 'Login',
      lbl_categorias: idioma === constant.idiomaEs ? 'Categorías' : 'Categories',
      lbl_register: idioma === constant.idiomaEs ? 'Registro' : 'Register',
      lbl_posts_populares: idioma === constant.idiomaEs ? 'Posts Populares' : 'Populare Posts',
      lbl_colaboradores: idioma === constant.idiomaEs ? 'Colaboradores' : 'Collaborators',
      lbl_bienvenido: idioma === constant.idiomaEs ? 'Bienvenido' : 'Welcome',
      lbl_oficial_web_page: idioma === constant.idiomaEs ? 'Página Oficial de EUTANASIA' : 'Official Web Page of EUTANASIA',
      lbl_biografia_1: idioma === constant.idiomaEs ? "EUTANASIA, es una banda de Hard Rock/Rock and Roll formada en Ocaña (Colombia) a finales del año 2013 inicialmente. La idea empezó con influencias del Heavy Metal y Hard Rock bajo un sonido contundente tratando de rescatar la cruda y emblemática música de los 70's. Buscando la identidad, se decide que el género de la banda sea único pues la propuesta mantiene los riffs clásicos de los géneros Rythym and Blues y Rock 'n Roll, combinándolos con la potencia y el peso de las guitarras distorsionadas. Es rock agresivo, rock y furia, Eutanasia es desahogarse y descansar, Eutanasia es: Frenético Rock 'n Roll." : "EUTANASIA, is a Hard Rock / Rock and Roll band formed in Ocaña (Colombia) at the end of 2013 before. The idea started with heavy metal influences and Hard Rock under a blunt sound trying to rescue the raw and emblematic music of the 70's. Looking for the identity, it is decided that the The band's genre is unique as the proposal maintains the classic riffs of the Rythym genres and Blues and Rock 'n Roll, combining them with the power and weight of guitars distorted. It is aggressive rock, rock and fury, Euthanasia is venting and resting, Euthanasia en: Frenzy Rock 'n Roll.",
      lbl_biografia_2: idioma === constant.idiomaEs ? "Entre las bandas que marcan los gustos del grupo están: AC/DC, Deep Purple, Led Zeppelin, Motorhead y Black Sabbath. La música representa un descanso, liberar esa represión social que conlleva nuestra vida de gustos alternativos, por vestir diferente, por lo que escuchamos, por lo que hacemos. En analogía, es la Eutanasia de problemas y señalamientos por estereotipos basados en gustos." : "Among the bands that mark the group's tastes are: AC / DC, Deep Purple, Led Zeppelin, Motorhead and Black Sabbath. Music represents a break, releasing that social repression that involves our life of alternative tastes, by dressing differently, by what we hear, by what we do. In analogy, it is the Euthanasia of problems and stereotyping based on taste.",
      lbl_biografia_2013_1: idioma === constant.idiomaEs ? "Su primer concierto se llevó a cabo la noche del 31 de Marzo de 2013, participando en 'Underground Rock II', coincidiendo con el lanzamiento de dos temas: 'Ya es tarde' y 'Eutanasia', esta última representando la identidad del grupo. En ese mismo año, el 28 de Septiembre, Eutanasia se presenta en Bucaramanga en el evento 'Tribute to the Gods' donde de igual forma se da la oportunidad de mostrar dos nuevos temas, 'Buscando Identidad' y 'Prestigio Fatal'. En esta ocasión hay un cambio en los integrantes de la banda, donde Carlos Baene es presentado como el nuevo Bajista." : "His first concert was held on the night of March 31, 2013, participating in 'Underground Rock II', coinciding with the release of two songs: 'Ya es tarde' and 'Eutanasia', the latter representing the identity of the group. In that same year, on September, Euthanasia is presented in Bucaramanga at the event 'Tribute to the Gods' where in the same way, there is the opportunity to show two new themes, 'Buscando Identidad' and 'Prestigio Fatal'. This time there is a change in the members of the band, where Carlos Baene is introduced as the new Bass Player.",
      lbl_biografia_2013_2: idioma === constant.idiomaEs ? "Poco más de un mes después, el 1 de Noviembre, el grupo hace presencia y participa en el 'Concurso de Bandas de Rock 2' donde se logra el segundo puesto, dando a conocer a Eutanasia como la banda de Hard Rock/Rock and Roll más reconocida a nivel municipal e influyente dentro de los parámetros del Rock en Ocaña para las bandas que comienzan su carrera musical. Luego, el 21 de diciembre, Eutanasia se presenta en el evento 'Underground Rock III', convirtiéndose este en un año de oportunidades para la agrupación. La banda cuenta en estos momentos con diez sencillos, cinco de ellos en su primer demo 'Frenético Rock & Roll.'" : "A little over a month later, on November 1, the group is present and participates in the 'Contest of Rock Bands 2' where second place is achieved, publicizing Eutanasia as the most recognized and influential Hard Rock / Rock and Roll band at the municipal level within the parameters of Rock in Ocaña for bands that begin their musical careers. Then he twenty-one December, Eutanasia is presented at the event 'Underground Rock III', becoming this in a year of opportunities for the grouping. The band currently has ten singles, five of them in their first demo 'Frenzy Rock & Roll.'",
      lbl_biografia_2013_3: idioma === constant.idiomaEs ? "Para cerrar el 2013, la banda se presentó en la “Rifa/Concierto” el 28 de Diciembre. Esta banda con influencias como AC/DC, Deep Purple o Black Sabbath, se ha caracterizado por mostrar algo diferente a nivel local, precisamente eso es lo que ayuda para la aceptación del público recuperando la escena rockera." : "To close 2013, the band performed at the “Raffle / Concert” on December 28th. This band with influences such as AC / DC, Deep Purple or Black Sabbath, has been characterized by showing something different at the local level, precisely that is what helps for the acceptance of the public recovering the rock scene.",
      lbl_biografia_2014_1: idioma === constant.idiomaEs ? "El año 2014 ha sido uno de los mejores para la banda, participamos en diferentes eventos, como el Underground Rock IV o el concurso de bandas III en el cuál el guitarrista Juan P. Sánchez fue nombrado como mejor guitarrista de la ciudad. El evento más importante fue 'La Guardia Fest' que se realizó en el ecoparque de Comfaoriente, en Cúcuta, a mediados de diciembre. 'Una experiencia única como cada vez que se viajamos fuera de nuestra ciudad', dice Juan Pablo, Guitarrista." : "2014 has been one of the best for the band, we participated in different events, such as Underground Rock IV or the band contest III in which guitarist Juan P. Sánchez was named the best guitarist in the city. The most important event was 'La Guardia Fest' that was held in the Comfaoriente eco-park, in Cúcuta, in mid-December. 'A unique experience like every time we travel outside of our city', says Juan Pablo, Guitarist.",
      lbl_biografia_2015_1: idioma === constant.idiomaEs ? "Ya en el 2015 empiezan meses difíciles porque se cambia de baterista un par de veces, a pesar de los percances Leonardo Navarro se incluye como nuevo Baterista de la banda, se presentan en enero en libélula bar en el evento 'Rock Night', y en la integración universitaria de la UFPSO de ese año. Ahora que la banda está consolidada y con las baterías de rock recargadas, se espera tocar en bares de la ciudad para abrir puertas a la escena y realizar eventos, tal como fue el 'Halloween trick or treat' organizado por la banda el 31 de Octubre. Todo esto como preparación para el concurso de bandas local y para la oportunidad de salir de la ciudad de nuevo." : "Already in 2015 difficult months begin because the drummer is changed a couple of times, despite the mishaps Leonardo Navarro is included as the new drummer of the band, they perform in January in dragonfly bar at the 'Rock Night' event, and in the university integration of the UFPSO that year. Now that the band is consolidated and with the rock batteries recharged, it is expected to play in bars in the city to open doors to the scene and hold events, such as the 'Halloween trick or treat' organized by the band on October 31 . All of this in preparation for the local band contest and for the chance to get out of town again.",
      lbl_biografia_2016_1: idioma === constant.idiomaEs ? "Para el 2016, la acogida va en aumento, siendo Cúcuta la ciudad que más oportunidades ha generado, la banda encuentra una unión que permite sortear las dificultades. Problemas casi al punto de quebrar el grupo porque una convivencia no es fácil, pero se supo manejar apostándole a la unión y los eventos que fueron surgiendo. Se da la posibilidad de estar en el compilado 'XIIIC-001 SANTANDER COALITION' al lado de bandas reconocidas del departamente. En cuanto a presentaciones, en la ciudad de Ocaña se acompañó en eventos privados y se contó con la posibilidad de presentarse en la Plaza de Ferias para el 'Concierto de la fraternidad' y la Integración de Colegios del Municipio. Además se hicieron participes del evento 'Catatumbo Rock Festival'. A nivel nacional se participa en convocatorias para eventos como el 'Viboral Rock' llegando hasta el último filtro (Quedando entre las 40 bandas finalistas seleccionadas de todo el país). También se presentan en el 'SomosUno' en cúcuta y el 'Rock al Parche 2' en bucaramanga, donde se puede compartir tarima con bandas de gran trayectoria, como es el caso de Ursus." : "For 2016, the reception is increasing, with Cúcuta being the city that has generated the most opportunities, the band finds a union that allows them to overcome difficulties. Problems almost to the point of breaking the group because a coexistence is not easy, but they knew how to handle betting on the union and the events that were arising. There is the possibility of being in the compilation 'XIIIC-001 SANTANDER COALITION' next to recognized bands of the department. Regarding presentations, in the city of Ocaña he was accompanied in private events and had the possibility to appear in the Plaza de Ferias for the 'Concert of the fraternity' and the Integration of Municipal Schools. They also participated in the 'Catatumbo Rock Festival' event. At the national level, they participate in calls for events such as 'Viboral Rock' reaching the last filter (remaining among the 40 finalist bands selected from all over the country). They also perform at the 'SomosUno' in Cúcuta and the 'Rock al Parche 2' in Bucaramanga, where you can share a stage with bands of great experience, as is the case with Ursus.",
      lbl_biografia_2017_1: idioma === constant.idiomaEs ? "Eutanasia recibe el 2017 recargado con una buena dosis de Rock & Roll, en lo que va del año, ya se ha participado en 2 eventos en la ciudad de Cúcuta 'Possesed By Metal' y 'Estridente Amanecer 2' donde se nota el apoyo del público de la región. La banda tiene como proyección grabar el primer CD Album completo de 12 Canciones inéditas y realizar su primer videoclip oficial. En Busca de patrocinadores que impulsen el trabajo que se viene realizando desde hace 5 años, que ha sido arduo. La banda manda un mensaje a sus seguidores: 'Queremos aprovechar y agradecer a la gente que ha creido en nosotros y nos apoya en cada toque, evento, concierto, concurso. Gracias a todo el público que nos motiva a seguir en este sueño. Es un orgullo para nosotros representar a nuestra tierra.'" : "Euthanasia receives 2017 recharged with a good dose of Rock & Roll, so far this year, it has already participated in 2 events in the city of Cúcuta 'Possesed By Metal' and 'Estridente Amanecer 2' where the support of the public of the region. The band plans to record the first complete CD Album of 12 unpublished songs and make their first official video clip. In search of sponsors to promote the work that has been done for 5 years, which has been arduous. The band sends a message to its followers: 'We want to take advantage of and thank the people who have believed in us and support us in every touch, event, concert, contest. Thanks to all the public that motivates us to continue in this dream. We are proud to represent our land.'",
      lbl_info_sin_resultados: idioma === constant.idiomaEs ? 'Sin Resultados' : 'Without Results',
      lbl_info_fallo_conectar_base_datos: idioma === constant.idiomaEs ? 'No hay Conexión a la Base de Datos' : 'Without Conection to Data Base',
      lbl_info_cargando_resultados: idioma === constant.idiomaEs ? 'Cargando Resultados' : 'Loading Results',
      lbl_info_proceso_completo: idioma === constant.idiomaEs ? 'Proceso realizado Satisfactoriamente' : 'Process Complete',
      lbl_error_403: idioma === constant.idiomaEs ? '403' : '403',
      lbl_error_404: idioma === constant.idiomaEs ? '404' : '404',
      lbl_error_500: idioma === constant.idiomaEs ? '500' : '500',
      lbl_mensaje_error_404: idioma === constant.idiomaEs ? 'La página que busca no ha sido encontrada.' : 'Page Not Found.',
      lbl_oops: idioma === constant.idiomaEs ? '¡Oops!' : 'Oops!',
      lbl_vencimiento_token_sesion: idioma === constant.idiomaEs ? 'Fecha de Vencimiento del Token: ' : 'Token Expiration Date',
      lbl_vcode_expiro: idioma === constant.idiomaEs ? 'El Código de Verificación ya expiró.' : 'The Verification Code has expired.',
      lbl_ir_a: idioma === constant.idiomaEs ? 'Ir a: ' : 'Go to: ',
      lbl_ir_inicio: idioma === constant.idiomaEs ? 'Ir al Login' : 'Go to Login',
      lbl_btn_olvidaste_tu_clave: idioma === constant.idiomaEs ? '¿Olvidaste tu Clave?' : 'Do You forget your Password?',
      lbl_btn_no_ha_llegado_correo_vcode: idioma === constant.idiomaEs ? '¿No ha llegado ningún Correo? Presiona para Reintentar.' : 'No mail has arrived? Press to Retry.',
      lbl_drag_archivos: idioma === constant.idiomaEs ? 'Haga [Clic] o arrastre un archivo aquí' : 'Click or Drag a file here',
      lbl_cantidad_max_archivos: idioma === constant.idiomaEs ? 'Cantidad máxima: 5 archivos' : 'Only 5 Files',
      lbl_galeria_media: idioma === constant.idiomaEs ? 'Galería y Multimedia' : 'Gallery and Media',
      lbl_eutanasicos: idioma === constant.idiomaEs ? 'Eutanásicos' : 'Euthanasian',
      lbl_participaciones: idioma === constant.idiomaEs ? 'Participaciones' : 'Participations',
      lbl_proximo_evento: idioma === constant.idiomaEs ? 'Próximo Evento' : 'Next Event',
      lbl_posts: idioma === constant.idiomaEs ? 'Posts' : 'Posts',
      lbl_registro_ingreso: idioma === constant.idiomaEs ? 'Registro/Ingreso' : 'Register/Login',
      lbl_por_definir: idioma === constant.idiomaEs ? 'Por definir' : 'To define',
      lbl_comparte: idioma === constant.idiomaEs ? 'Compartí' : 'Share',
      lbl_blog: idioma === constant.idiomaEs ? 'Blog' : 'Blog',
      lbl_bio: idioma === constant.idiomaEs ? 'Biografía' : 'Biography',
      lbl_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Start',
      lbl_ultimas_publicaciones: idioma === constant.idiomaEs ? 'Últimas Publicaciones' : 'Latest Posts',
      lbl_contacto: idioma === constant.idiomaEs ? 'Contacto' : 'Contact',
      lbl_leer_mas: idioma === constant.idiomaEs ? 'Leer Más...' : 'Read more...',
      lbl_disenador_grafico: idioma === constant.idiomaEs ? 'Diseñador Gráfico' : 'Graphic Designer',
      lbl_estudio_grabacion: idioma === constant.idiomaEs ? 'Estudio de Grabación' : 'Recording Studio',

      // Banda
      lbl_banda: idioma === constant.idiomaEs ? 'Banda' : 'Band',
      lbl_banda_frenetico_rock_and_roll: idioma === constant.idiomaEs ? 'Frenético Rock and Roll' : 'Frenzy Rock and Roll',
      lbl_banda_descripcion_demo: idioma === constant.idiomaEs ? 'Este es el primer Demo de la banda. Temática de metamorfosis en el pensamiento crítico y en la influencia musical en la vida diaria. Esto es dedicado a todas esas personas que quieren descansar, pero no lo pueden expresar: ¡Eutanasia Para Todos!' : 'This is the first demo of the band. Metamorphosis theme in critical thinking and musical influence on daily life. This is dedicated to all those people who want to rest, but cannot express it: Eutanasia for All!',
      lbl_banda_demo_1: idioma === constant.idiomaEs ? 'Ya es tarde' : 'Ya es tarde',
      lbl_banda_demo_2: idioma === constant.idiomaEs ? 'Buscando identidad' : 'Buscando identidad',
      lbl_banda_demo_3: idioma === constant.idiomaEs ? 'Prestigio fatal' : 'Prestigio fatal',
      lbl_banda_demo_4: idioma === constant.idiomaEs ? 'De vuelta al infierno' : 'De vuelta al infierno',
      lbl_banda_demo_5: idioma === constant.idiomaEs ? 'No moriré' : 'No moriré',
      lbl_banda_pedro: idioma === constant.idiomaEs ? 'Pedro Sánchez' : 'Pedro Sánchez',
      lbl_banda_pipe: idioma === constant.idiomaEs ? 'Andrés Sánchez' : 'Andrés Sánchez',
      lbl_banda_leo: idioma === constant.idiomaEs ? 'Leo Navarro' : 'Leo Navarro',
      lbl_banda_carlos: idioma === constant.idiomaEs ? 'Carlos Baene' : 'Carlos Baene',
      lbl_banda_vocalista: idioma === constant.idiomaEs ? 'Vocalista' : 'Vocalist',
      lbl_banda_guitarrista: idioma === constant.idiomaEs ? 'Guitarrista' : 'Guitarist',
      lbl_banda_bajista: idioma === constant.idiomaEs ? 'Bajista' : 'Bassist',
      lbl_banda_baterista: idioma === constant.idiomaEs ? 'Baterista' : 'Drummer',
      lbl_banda_carlos_jacome: idioma === constant.idiomaEs ? 'Carlos Jácome' : 'Carlos Jácome',
      lbl_banda_guardia_estudio: idioma === constant.idiomaEs ? 'La Guardia Estudio' : 'La Guardia Estudio',
      lbl_banda_resena_carlos_jacome: idioma === constant.idiomaEs ? 'Apasionado por la música, el arte y el diseño, me he desempeñado profesionalmente en Agencias de Publicidad & Diseño y en la parte académica como docente, trabajos de ilustración para portadas de cds, libros, revistas, proyectos de identidad gráfica corporativa y diseño editorial.' : 'Passionate about music, art and design, I have worked professionally in Advertising & Design Agencies and in the academic part as a teacher, illustration work for CD covers, books, magazines, corporate graphic identity projects and editorial design.',
      lbl_banda_ayuda_compartir: idioma === constant.idiomaEs ? 'Ayúdanos a compartir nuestra música a todo el mundo' : 'Help us share our music with everyone',

      // Mensajes
      lbl_mensaje_archivo_subido: idioma === constant.idiomaEs ? 'Archivo(s) subido correctamente.' : 'File(s) uploaded successfully.',
      lbl_mensaje_cant_archivos_permitidos: idioma === constant.idiomaEs ? 'La cantidad de archivos por subir supera la cantidad permitida.' : 'The number of files to upload exceeds the allowed number.',
      lbl_mensaje_cant_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'Máximo {0} archivo(s).' : 'Limit is {0} at most.',
      lbl_mensaje_dropzone_principal: idioma === constant.idiomaEs ? 'Esta es una zona de carga de archivos' : 'This is a file upload area.',
      lbl_mensaje_dropzone_secundario: idioma === constant.idiomaEs ? 'Arrastre su archivo o dé [Clic] para subir uno desde el explorador de archivos' : 'Drag your file or Click to upload one from file explorer.',
      lbl_mensaje_size_archivos_permitidos: idioma === constant.idiomaEs ? 'Error con el tamaño del archivo: ' : 'File size error: ',
      lbl_mensaje_size_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'El tamaño del archivo excede lo permitido. El máximo es ' : 'The file size exceeds what is allowed. Maximum upload size is ',
      lbl_mensaje_tipo_archivos_permitidos_generico: idioma === constant.idiomaEs ? 'El tipo del archivo o elemento no es permitido.' : 'The file or element type is not allowed.',
      lbl_mensaje_tipo_archivos_permitidos: idioma === constant.idiomaEs ? 'Error con el tipo del archivo: ' : 'File type error: ',
      lbl_mensaje_tipo_archivos_permitidos_detalle: idioma === constant.idiomaEs ? 'El tipo del archivo no es permitido. Se permiten {0}.' : 'The file type is not allowed. Allowed file types {0}.',
      lbl_mensaje_archivo_no_subido: idioma === constant.idiomaEs ? 'El archivo no pudo ser procesado.' : 'The file could not be processed.',
      lbl_mensaje_seleccione_archivo_para_subir: idioma === constant.idiomaEs ? 'Seleccione un archivo.' : 'Select a file.',
      lbl_mensaje_no_conexion_servidor: idioma === constant.idiomaEs ? 'No se ha podido establecer la conexión con el Servidor en algun proceso interno' : 'The connection to the Server could not be established in some internal process',
      lbl_mensaje_login_invalido: idioma === constant.idiomaEs ? 'El Usuario y/o la Contraseña son incorrectos' : 'The User and/or Password are incorrect',
      lbl_mensaje_sin_detalles_error: idioma === constant.idiomaEs ? 'No hay detalles del error' : 'No error details',
      lbl_mensaje_error_403_ingresar_ruta: idioma === constant.idiomaEs ? 'Está intentando ingresar a la ruta: ' : '',
      lbl_mensaje_error_403_no_permisos: idioma === constant.idiomaEs ? 'No cuenta con permisos para visualizar el contenido.' : 'You do not have permissions to view its content.',
      lbl_mensaje_error_403_sesion_expirada: idioma === constant.idiomaEs ? 'Su sesión ha expirado. Debe ingresar de nuevo a la aplicación.' : 'Your session has expired. You must enter the application again.',
      lbl_mensaje_error_500_no_sesion: idioma === constant.idiomaEs ? 'No tiene una Sesión Iniciada.' : 'You dont have a session started.',

      // Modales
      lbl_info_titulo_modal_error: idioma === constant.idiomaEs ? 'ERROR' : 'ERROR',
      lbl_info_titulo_modal_informacion: idioma === constant.idiomaEs ? 'INFORMACION' : 'INFORMATION',
      lbl_info_titulo_modal_advertencia: idioma === constant.idiomaEs ? 'ADVERTECNIA' : 'WARNING',
      lbl_info_titulo_modal_proceso_exitoso: idioma === constant.idiomaEs ? 'PROCESO EXITOSO' : 'PROCESS COMPLETE',

      // Steps
      lbl_info_titulo_step_personal: idioma === constant.idiomaEs ? 'PERSONAL' : 'PERSONAL',
      lbl_info_titulo_step_identificacion: idioma === constant.idiomaEs ? 'IDENTIFICACIÓN' : 'IDENTIFICATION',
      lbl_info_titulo_step_seguridad: idioma === constant.idiomaEs ? 'SEGURIDAD' : 'SECURITY',
      lbl_info_titulo_step_confirmacion: idioma === constant.idiomaEs ? 'CONFIRMACION' : 'CONFIRMATION',

      // Menu
      lbl_menu_parametrizacion: idioma === constant.idiomaEs ? 'Parametrización' : 'Parameterization',
      lbl_menu_sesion: idioma === constant.idiomaEs ? 'Sesión' : 'Session',
      lbl_menu_usuario: idioma === constant.idiomaEs ? 'Usuarios' : 'Users',
      lbl_menu_tercero: idioma === constant.idiomaEs ? 'Empresas/Terceros' : 'Companies',
      lbl_menu_sala: idioma === constant.idiomaEs ? 'Salas de Ensayo' : 'Rehearsal Rooms',
      lbl_menu_ubicacion: idioma === constant.idiomaEs ? 'Ubicaciones' : 'Locations',
      lbl_menu_banda_integrante: idioma === constant.idiomaEs ? 'Bandas/Integrantes' : 'Bands/Members',
      lbl_menu_ensayo: idioma === constant.idiomaEs ? 'Agendar Ensayo' : 'Schedule Rehearsal',
      lbl_menu_factura_pago: idioma === constant.idiomaEs ? 'Facturas/Pagos' : 'Bills/Payments',
      lbl_menu_inventario: idioma === constant.idiomaEs ? 'Productos/Accesorios' : 'Products/Accesories',
      lbl_menu_prestamo: idioma === constant.idiomaEs ? 'Alquiler' : 'Rental',

      // Acciones
      lbl_btn_ingresar: idioma === constant.idiomaEs ? 'Ingresar' : 'Sign In',
      lbl_btn_registrarse: idioma === constant.idiomaEs ? 'Registrarse' : 'Register',
      lbl_btn_inicio: idioma === constant.idiomaEs ? 'Inicio' : 'Login',
      lbl_btn_consultar: idioma === constant.idiomaEs ? 'Consultar' : 'Query',
      lbl_btn_crear: idioma === constant.idiomaEs ? 'Crear' : 'Create',
      lbl_btn_editar: idioma === constant.idiomaEs ? 'Editar' : 'Edit',
      lbl_btn_limpiar: idioma === constant.idiomaEs ? 'Limpiar' : 'Clean',
      lbl_btn_atras: idioma === constant.idiomaEs ? 'Atrás' : 'Back',
      lbl_btn_masivo: idioma === constant.idiomaEs ? 'Masivo' : 'Masive',
      lbl_btn_exportar: idioma === constant.idiomaEs ? 'Exportar' : 'Export',
      lbl_btn_importar: idioma === constant.idiomaEs ? 'Importar' : 'Import',
      lbl_btn_actualizar: idioma === constant.idiomaEs ? 'Actualizar' : 'Update',
      lbl_btn_guardar: idioma === constant.idiomaEs ? 'Guardar' : 'Save',
      lbl_btn_ite_remover: idioma === constant.idiomaEs ? 'Remover' : 'Remove',
      lbl_btn_ite_agregar: idioma === constant.idiomaEs ? 'Agregar' : 'Add',
      lbl_btn_siguiente: idioma === constant.idiomaEs ? 'Siguiente' : 'Next',
      lbl_btn_anterior: idioma === constant.idiomaEs ? 'Anterior' : 'Back',
      lbl_btn_cancelar: idioma === constant.idiomaEs ? 'Cancelar' : 'Cancel',
      lbl_btn_subir: idioma === constant.idiomaEs ? 'Subir' : 'Upload',
      lbl_btn_escoger: idioma === constant.idiomaEs ? 'Escoger' : 'Choose',
      lbl_btn_escoger_archivo: idioma === constant.idiomaEs ? 'Escoger Archivo' : 'Choose File',
      lbl_subir_archivos: idioma === constant.idiomaEs ? 'Subir Archivos' : 'Upload Files',

      // Header
      lbl_header_usuario: idioma === constant.idiomaEs ? 'Usuario' : 'User',
      lbl_header_nombre: idioma === constant.idiomaEs ? 'Nombre' : 'Name',

      // Titles
      lbl_mtto_consulta: idioma === constant.idiomaEs ? 'Consulta' : 'Query',
      lbl_mtto_creacion_edicion: idioma === constant.idiomaEs ? 'Creación/Edición' : 'Create/Edit',

      // Tooltips
      lbl_tip_cerrar_sesion: idioma === constant.idiomaEs ? 'Cerrar Sesión' : 'End Session',
      lbl_tip_agregar: idioma === constant.idiomaEs ? '[Clic] para agregar un nuevo registro' : 'Click to add a new register',
      lbl_tip_editar: idioma === constant.idiomaEs ? '[Clic] para editar registro' : 'Click to edit the register selected',
      lbl_tip_eliminar: idioma === constant.idiomaEs ? '[Clic] para eliminar registro' : 'Click to delete the register selected',
      lbl_tip_buscar: idioma === constant.idiomaEs ? '[Clic] para buscar registros' : 'Click to search registers',
      lbl_tip_limpiar: idioma === constant.idiomaEs ? '[Clic] para limpiar' : 'Click to clean',
      lbl_tip_anterior: idioma === constant.idiomaEs ? '[Clic] para regresar' : 'Click to go back',
      lbl_tip_actualizar: idioma === constant.idiomaEs ? '[Clic] para actualizar' : 'Click to update',
      lbl_tip_guardar: idioma === constant.idiomaEs ? '[Clic] para guardar' : 'Click to save',
      lbl_tip_exportar_datos: idioma === constant.idiomaEs ? '[Clic] para exportar' : 'Click to export',
      lbl_tip_subir_archivos: idioma === constant.idiomaEs ? '[Clic] para subir archivos' : 'Click to upload files',
      lbl_tip_eliminar_archivo: idioma === constant.idiomaEs ? '[Clic] para eliminar archivo' : 'Click to delete file',
      lbl_tip_mostrar_ocultar_archivos: idioma === constant.idiomaEs ? '[Clic] para mostrar/ocultar archivos' : 'Click to show/hide files',

      //Enums
      lbl_enum_generico_valor_vacio: idioma === constant.idiomaEs ? 'Selecciona una opción' : 'Select a Item',

      lbl_enum_si: idioma === constant.idiomaEs ? 'Si' : 'Yes',
      lbl_enum_no: idioma === constant.idiomaEs ? 'No' : 'No',

      lbl_enum_modulo_test: idioma === constant.idiomaEs ? 'Test' : 'Test',
      lbl_enum_modulo_tb_perfil: idioma === constant.idiomaEs ? 'Perfil' : 'Profile',
      lbl_enum_modulo_tb_usuario: idioma === constant.idiomaEs ? 'Usuario' : 'User',
      lbl_enum_modulo_tb_perfil_x_usuario: idioma === constant.idiomaEs ? 'Perfil x Usuario' : 'Profile x User',

      lbl_enum_sexo_valor_masculino: idioma === constant.idiomaEs ? 'Masculino' : 'Man',
      lbl_enum_sexo_valor_femenino: idioma === constant.idiomaEs ? 'Femenino' : 'Femenino',
      lbl_enum_sexo_valor_ambos: idioma === constant.idiomaEs ? 'Ambos' : 'Ambos',

      lbl_enum_tipo_usuario_valor_cliente: idioma === constant.idiomaEs ? 'Cliente' : 'Client',
      lbl_enum_tipo_usuario_valor_empleado: idioma === constant.idiomaEs ? 'Empleado' : 'Employed',
      lbl_enum_tipo_usuario_valor_administrador: idioma === constant.idiomaEs ? 'Administrador' : 'Admin',

      lbl_enum_tipo_documento_valor_cc: idioma === constant.idiomaEs ? 'CC' : 'CC',
      lbl_enum_tipo_documento_valor_ti: idioma === constant.idiomaEs ? 'TI' : 'TI',
      lbl_enum_tipo_documento_valor_ce: idioma === constant.idiomaEs ? 'CE' : 'CE',

      lbl_enum_tipo_ubicacion_valor_pais: idioma === constant.idiomaEs ? 'País' : 'Country',
      lbl_enum_tipo_ubicacion_valor_departamento: idioma === constant.idiomaEs ? 'Departamento/Región/Estado' : 'Department/Region/State',
      lbl_enum_tipo_ubicacion_valor_ciudad: idioma === constant.idiomaEs ? 'Ciudad' : 'City',

      lbl_enum_categoria_valor_invitacion_evento: idioma === constant.idiomaEs ? 'Invitación Evento' : 'Event Invitation',
      lbl_enum_categoria_valor_agradecimientos_saludos: idioma === constant.idiomaEs ? 'Agradecimientos y Saludos' : 'Thanks and Greetings',
      lbl_enum_categoria_valor_criticas: idioma === constant.idiomaEs ? 'Críticas' : 'Critics',
      lbl_enum_categoria_valor_frenetico_rnr: idioma === constant.idiomaEs ? 'Frenético Rock n Roll' : 'Frenzy Rock n Roll',
      lbl_enum_categoria_valor_noticias_mundiales: idioma === constant.idiomaEs ? 'Noticias Mundiales' : 'World News',

      // Módulos Genéricos
      lbl_mtto_generico_activo: idioma === constant.idiomaEs ? 'Activo' : 'Active',
      lbl_mtto_generico_step_1_registrar_usuario: idioma === constant.idiomaEs ? 'Registre su Información Personal' : 'Register your Personal Information.',
      lbl_mtto_generico_step_2_registrar_usuario: idioma === constant.idiomaEs ? 'Registre su Información de Identificación' : 'Register your Identification Information.',
      lbl_mtto_generico_step_3_registrar_usuario: idioma === constant.idiomaEs ? 'Cree su nuevo Usuario' : 'Create your new user.',
      lbl_mtto_generico_step_4_registrar_usuario: idioma === constant.idiomaEs ? 'Ingrese el código de verificación que se ha enviado a su correo para Activar la Cuenta.' : 'Enter the verification code that sent your email to activate the account.',
      lbl_mtto_generico_step_registrar_usuario_error: idioma === constant.idiomaEs ? 'Los datos suministrados en este Paso son incorrectos. Verifique la información.' : 'The data provided in this step is incorrect. Check the information.',
      lbl_mtto_generico_codigo_verificaicion_enviado_ok: idioma === constant.idiomaEs ? 'Se ha enviado el Código de Verificación de Cuenta correctamente.' : 'The Account Verification Code has been sent correctly.',
    }
  };
}