import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../.././services/rest.service';
import { MessageService } from 'primeng/api';
import { TextProperties } from 'src/app/config/TextProperties';
import { Util } from 'src/app/config/Util';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { Enumerados } from 'src/app/config/Enumerados';
import { SesionService } from 'src/app/services/sesionService/sesion.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Galleria } from 'primeng/galleria';
import { interval } from 'rxjs';
import { ToqueModel } from 'src/app/model/toque-model';
import { PostModel } from 'src/app/model/post-model';
import { EutanasiaService } from 'src/app/services/eutanasiaService/eutanasia.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [RestService, MessageService]
})

export class HomeComponent implements OnInit {
  // Objetos de Sesion
  sesion: any;

  // Objetos de datos
  listaEventos: ToqueModel[];
  listaPosts: PostModel[];

  // Carousels
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  // Galleria
  @ViewChild('galleria') galleria: Galleria;
  images: any[];
  showThumbnails: boolean;
  fullscreen: boolean = false;
  activeIndex: number = 0;
  onFullScreenListener: any;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  // Reproductor Audio
  audioObj = new Audio();
  songPosition: number;
  songTime: String;
  songTimeMax: String;
  cancionActual: number;
  duracionMaxima: any;
  cancionSeleccionada: String;
  subscribeSong: any;

  // Utilidades
  msg: any;
  const: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService, public eutanasiaService: EutanasiaService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
    this.const = this.objectModelInitializer.getConst();
  }

  ngOnInit() {
    sessionStorage.clear();
    this.songPosition = 0;
    this.duracionMaxima = 0;
    this.songTime = '00:00';
    this.songTimeMax = '00:00';
    this.cancionActual = 1;
    this.cancionSeleccionada = "Buscando Identidad";
    this.cargarEventos();
    this.cargarPost();
    this.cargarGaleria();
    this.bindDocumentListeners();
  }

  playSongSlider() {
    $('audio').each(function () {
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
    });
    $('#playSong').hide();
    $('#stopSong').fadeIn('slow');
    // Cargamos el archivo y la duración
    switch (this.cancionActual.toString()) {
      case '1':
        this.audioObj.src = "assets/audio/demo/1-BUSCANDO-IDENTIDAD.mp3";
        this.cancionSeleccionada = "Buscando identidad";
        this.duracionMaxima = 240;
        break;
      case '2':
        this.audioObj.src = "assets/audio/demo/2-YA-ES-TARDE.mp3";
        this.cancionSeleccionada = "Ya es tarde";
        this.duracionMaxima = 215;
        break;
      case '3':
        this.audioObj.src = "assets/audio/demo/3-DE-VUELTA-AL-INFIERNO.mp3";
        this.cancionSeleccionada = "De vuelta al infierno";
        this.duracionMaxima = 269;
        break;
      case '4':
        this.audioObj.src = "assets/audio/demo/4-PRESTIGIO-FATAL.mp3";
        this.cancionSeleccionada = "Prestigio fatal";
        this.duracionMaxima = 200;
        break;
      case '5':
        this.audioObj.src = "assets/audio/demo/5-NO-MORIRE.mp3";
        this.cancionSeleccionada = "No moriré";
        this.duracionMaxima = 286;
        break;
    }
    let fechaMaxima = new Date(this.duracionMaxima * 1000);
    var minutoMax: any = (fechaMaxima.getMinutes() < 9) ? "0" + fechaMaxima.getMinutes() : fechaMaxima.getMinutes();
    var segundoMax: any = (fechaMaxima.getSeconds() < 9) ? "0" + fechaMaxima.getSeconds() : fechaMaxima.getSeconds();

    this.songTimeMax = minutoMax + ":" + segundoMax;

    this.audioObj.preload = 'metadata';
    this.audioObj.load();
    this.audioObj.play();

    const secondsCounter = interval(1000);
    this.subscribeSong = secondsCounter.subscribe(i => {
      this.songPosition = i;

      let fecha = new Date(this.songPosition * 1000);
      var minuto: any = (fecha.getMinutes() < 9) ? "0" + fecha.getMinutes() : fecha.getMinutes();
      var segundo: any = (fecha.getSeconds() < 9) ? "0" + fecha.getSeconds() : fecha.getSeconds();

      this.songTime = minuto + ":" + segundo;
    },
      error => {
        this.songPosition = 0;
        this.songTime = '00:00';
        this.songTimeMax = '00:00';
        console.log(error, "error");
      });
    setTimeout(function () {
      this.subscribeSong.unsubscribe();
      if (this.cancionActual < 5) {
        this.nextSongSlider();
      }
    }, this.duracionMaxima * 1000);
  }

  stopSongSlider() {
    $('audio').each(function () {
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
    });
    $('#stopSong').hide();
    $('#playSong').fadeIn('slow');
    this.subscribeSong.unsubscribe();
    this.audioObj.pause(); // Stop playing
    this.audioObj.currentTime = 0; // Reset time
    this.audioObj = new Audio();
    this.duracionMaxima = 0;
    this.songPosition = 0;
    this.songTime = '00:00';
    this.songTimeMax = '00:00';
  }

  nextSongSlider() {
    this.stopSongSlider();
    this.cancionActual++;
    this.playSongSlider();
  }

  prevSongSlider() {
    this.stopSongSlider();
    this.cancionActual--;
    this.playSongSlider();
  }

  onThumbnailButtonClick() {
    this.showThumbnails = !this.showThumbnails;
  }

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    }
    else {
      this.openPreviewFullScreen();
    }
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector(".p-galleria");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
    else if (elem['mozRequestFullScreen']) { /* Firefox */
      elem['mozRequestFullScreen']();
    }
    else if (elem['webkitRequestFullscreen']) { /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    }
    else if (elem['msRequestFullscreen']) { /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document['mozCancelFullScreen']) {
      document['mozCancelFullScreen']();
    }
    else if (document['webkitExitFullscreen']) {
      document['webkitExitFullscreen']();
    }
    else if (document['msExitFullscreen']) {
      document['msExitFullscreen']();
    }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener("fullscreenchange", this.onFullScreenListener);
    document.addEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.addEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.addEventListener("msfullscreenchange", this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener("fullscreenchange", this.onFullScreenListener);
    document.removeEventListener("mozfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("webkitfullscreenchange", this.onFullScreenListener);
    document.removeEventListener("msfullscreenchange", this.onFullScreenListener);
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }

  fullScreenIcon() {
    return `pi ${this.fullscreen ? 'pi-window-minimize' : 'pi-window-maximize'}`;
  }


  cargarGaleria() {
    this.images = [];
    for (let index = 1; index < 58; index++) {
      let nombreImagen = 'Imagen No. ' + index;
      let rutaImagen = "assets/images/pics/" + index + '.jpg';

      let imagenGaleria = this.objectModelInitializer.getDataImagenGalleria(nombreImagen, rutaImagen);
      this.images.push(imagenGaleria);
    }
  }

  cargarEventos() {
    this.listaEventos = [];
    try {
      this.restService.getREST(this.const.urlConsultarToques)
        .subscribe(resp => {
          this.listaEventos = JSON.parse(JSON.stringify(resp));
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  cargarPost() {
    this.listaPosts = [];
    let obj = this.objectModelInitializer.getDataPostModel();
    try {
      this.restService.postREST(this.const.urlConsultarPostsPorFiltros, obj)
        .subscribe(resp => {
          let listaTemporal = JSON.parse(JSON.stringify(resp));
          if (listaTemporal !== undefined && listaTemporal !== null) {
            this.listaPosts = listaTemporal.length > 3 ? listaTemporal.slice(listaTemporal.length - 3) : listaTemporal;
          }
        },
          error => {
            console.log(error, "error");
          })
    } catch (e) {
      console.log(e);
    }
  }

  convertirFechaPost(fechaString) {
    let fecha = new Date(fechaString);
    return fecha.getUTCDate() + " " + this.objectModelInitializer.getLocaleESForCalendar().monthNamesShort[fecha.getUTCMonth()]
  }

  verPost(post: PostModel) {
    this.eutanasiaService.post = post;
    sessionStorage.setItem('post', JSON.stringify(post));
    this.router.navigate(['blog']);
  }

}