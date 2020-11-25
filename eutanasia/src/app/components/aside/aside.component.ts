import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { CategoriasDTOModel } from 'src/app/model/dto/categorias-dto';

declare var $: any;

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  providers: [RestService, MessageService]
})
export class AsideComponent implements OnInit {
  // EventsEmmiter
  @Output() verPostEM: EventEmitter<any> = new EventEmitter();

  // Objetos de Sesion
  sesion: any;

  // Objetos de Datos
  postFiltro: PostModel;
  listaTags: any[];
  listaComentarios: ComentarioModel[];
  mapaComentarios: any;
  categoriasContadores: CategoriasDTOModel;
  listaPostsPopulares: PostModel[];

  // Utilidades
  msg: any;
  const: any;
  locale: any;
  maxDate = new Date();
  enums: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, private sanitization: DomSanitizer, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
    this.enums = enumerados.getEnumerados();
    this.locale = this.sesionService.objServiceSesion.idioma === this.objectModelInitializer.getConst().idiomaEs ? this.objectModelInitializer.getLocaleESForCalendar() : this.objectModelInitializer.getLocaleENForCalendar();
  }

  ngOnInit() {
    this.listaPostsPopulares = [];
    sessionStorage.clear();
    this.postFiltro = this.objectModelInitializer.getDataPostModel();
    this.cargarContadoresCategorias();
    this.buscarPostsMasPopulares();
    this.cargarTags();
  }

  convertirFechaBlog(fechaString) {
    let fecha = new Date(fechaString);
    return fecha.getUTCDate() + " " + this.objectModelInitializer.getLocaleESForCalendar().monthNamesShort[fecha.getUTCMonth()]
  }

  cargarContadoresCategorias() {
    this.categoriasContadores = this.objectModelInitializer.getDataCategoriasDtoModel();
    try {
      this.restService.getREST(this.const.urlConsultarContadorCategoriasPosts)
        .subscribe(resp => {
          this.categoriasContadores = JSON.parse(JSON.stringify(resp));
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  buscarPostPorNombreEnter(event) {
    if (event.keyCode === 13) {
      this.buscarPostPorFiltro();
    }
  }

  buscarPostPorFiltro() {
    try {
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, this.postFiltro)
        .subscribe(resp => {
          this.eutanasiaService.listaPost = JSON.parse(JSON.stringify(resp));
          this.router.navigate(['publicaciones']);
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  buscarPostsMasPopulares() {
    try {
      let obj = this.objectModelInitializer.getDataPostModel();
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, obj)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.listaPostsPopulares = listaTemporal.length > 3 ? listaTemporal.slice(listaTemporal.length - 3) : listaTemporal;
          }
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  cargarTags() {
    this.listaTags = [];
    try {
      this.restService.getREST(this.const.urlConsultarTags)
        .subscribe(resp => {
          this.listaTags = JSON.parse(JSON.stringify(resp));
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  verPost(post: PostModel) {
    this.verPostEM.emit(post);
    this.eutanasiaService.post = post;
    this.posicionarArriba();
    return true;
  }

  posicionarArriba() {
    $('body,html').animate({
      scrollTop: 0
    }, 600);
  }

}
