import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RestService } from '../../services/rest.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Enumerados } from 'src/app/config/Enumerados';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { PostModel } from 'src/app/model/post-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';
import { ComentarioModel } from 'src/app/model/comentario-model';
import { ArchivoModel } from 'src/app/model/archivo-model';
import { UsuarioAutorModel } from 'src/app/model/usuarioAutor-model';

declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [RestService, MessageService]
})
export class BlogComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  post: PostModel;
  listaTags: any[];
  listaComentarios: ComentarioModel[];
  mapaComentarios: any;
  comentarioNuevo: any;
  usuarioAutorTBLogin: UsuarioAutorModel;
  archivosTemporales: any[];
  archivoImagenRegister: ArchivoModel;
  showMenuMovil: boolean;

  // Utilidades
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitization: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.const = this.objectModelInitializer.getConst();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
    this.enums = enumerados.getEnumerados();
  }

  ngOnInit() {
    console.clear();
    this.usuarioAutorTBLogin = this.sesionService.getUsuarioSesionActual();
    this.comentarioNuevo = '';
    this.eutanasiaService.post = JSON.parse(sessionStorage.getItem('post'));
    if (this.eutanasiaService.post !== undefined && this.eutanasiaService.post !== null) {
      this.post = this.eutanasiaService.post;
      this.listaTags = this.post.tags.split(';');
      this.cargarComentarios();
      this.posicionarArriba();
    } else {
      // TODO: redirección a timeline
      this.router.navigate(['home']);
    }
  }

  ngDoCheck() {
    this.post = this.eutanasiaService.post;
    return true;
  }

  // Otras Funciones
  convertirFechaBlog(fechaString) {
    let fecha = new Date(fechaString);
    return fecha.getUTCDate() + " " + this.objectModelInitializer.getLocaleESForCalendar().monthNamesShort[fecha.getUTCMonth()]
  }

  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

  redirigirBlogsBlog() {
    this.router.navigate(['blogs']);
  }

  obtenerRespuestas(comentario: ComentarioModel) {
    return this.mapaComentarios.get(comentario.id);
  }

  obtenerCategoria(valorCategoria) {
    try {
      return this.util.getValorEnumerado(this.enums.categoriaPost.valores, valorCategoria).label;
    } catch (e) {
      console.log(e);
    }
  }

  mostrarOcultarMenuBlog() {
    this.showMenuMovil = !this.showMenuMovil;
  }

  esUsuarioLogueadoActivoBlog() {
    let result = false;
    let usuarioSession: UsuarioAutorModel = this.sesionService.getUsuarioSesionActual();
    let valorEstadoActivo = this.util.getValorEnumerado(this.enums.estadoUsuario.valores, 1);
    if (usuarioSession !== undefined && usuarioSession !== null && usuarioSession.estado === valorEstadoActivo.value) {
      result = true;
    }

    return result;
  }

  cerrarSesionBlog() {
    this.sesionService.cerrarSession();
    this.sesionService.objServiceSesion= this.objectModelInitializer.getDataServiceSesion();
    this.usuarioAutorTBLogin = this.objectModelInitializer.getDataUsuarioAutorModel();
    this.router.navigate(['home']);
  }

  // Servicios Web

  cargarComentarios() {
    this.listaComentarios = [];
    this.mapaComentarios = new Map();
    try {
      this.restService.postREST(this.const.urlConsultarComentariosPorIdPost, this.post)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            listaTemporal.forEach(comentario => {
              if (this.mapaComentarios.size === 0) {
                this.mapaComentarios.set(comentario.id, []);
                this.listaComentarios.push(comentario);
              } else {
                if (comentario.idComentarioRespuesta > 0 && this.mapaComentarios.has(comentario.idComentarioRespuesta)) {
                  this.mapaComentarios.get(comentario.idComentarioRespuesta).push(comentario);
                } else {
                  this.mapaComentarios.set(comentario.id, []);
                  this.listaComentarios.push(comentario);
                }
              }
            });
          }
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  // Modales

  abrirModalUpdateUserBlog() {
    //this.disModUpdateUser = true;
  }

}
