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
  listaEventos1: any[];
  listaEventos2: any[];
  listaEventos3: any[];
  listaEventos4: any[];
  listaEventos5: any[];
  listaEventos6: any[];
  listaEventos7: any[];
  songPosition: number;
  songTime: String;

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

  // Utilidades
  msg: any;

  constructor(private router: Router, private route: ActivatedRoute, public restService: RestService, public textProperties: TextProperties, public util: Util, public objectModelInitializer: ObjectModelInitializer, public enumerados: Enumerados, public sesionService: SesionService, private messageService: MessageService) {
    this.sesion = this.objectModelInitializer.getDataServiceSesion();
    this.msg = this.textProperties.getProperties(this.sesionService.objServiceSesion.idioma);
  }

  ngOnInit() {
    this.songPosition = 0;
    this.songTime = '00:00';
    this.cargarEventos();
    this.cargarGaleria();
    this.bindDocumentListeners();
  }

  playSongSlider() {
    // Create an Observable that will publish a value on an interval
    const secondsCounter = interval(1000);
    secondsCounter.subscribe(i => {
      this.songPosition = i;

      let fecha = new Date(this.songPosition * 1000);
      var minuto: any = (fecha.getMinutes() < 9) ? "0" + fecha.getMinutes() : fecha.getMinutes();
      var segundo: any = (fecha.getSeconds() < 9) ? "0" + fecha.getSeconds() : fecha.getSeconds();

      this.songTime = minuto + ":" + segundo;
    },
      error => {
        this.songPosition = 0;
        this.songTime = '00:00';
        console.log(error, "error");
      });
  }

  stopSongSlider() {
    this.songPosition = 0;
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
    this.listaEventos1 = [];
    this.listaEventos1.push(this.objectModelInitializer.getDataEvento('2do Concurso de Rock', 'Año: 2013 - Ganadores del 2do puesto. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2013-concurso_rock_2.jpg'));
    this.listaEventos1.push(this.objectModelInitializer.getDataEvento('Rifa Concierto FORMA', 'Año: 2013 - Agrupación de talentos. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2013-rifa_concierto.jpg'));
    this.listaEventos1.push(this.objectModelInitializer.getDataEvento('Tribute to the Gods', 'Año: 2013 - Banda invitada. Evento realizado en la ciudad de Bucaramanga.', 'assets/images/events/2013-tribute_to_the_gods.jpg'));
    this.listaEventos1.push(this.objectModelInitializer.getDataEvento('Underground Rock 2', 'Año: 2013 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2013-underground_rock_2.jpg'));

    this.listaEventos2 = [];
    this.listaEventos2.push(this.objectModelInitializer.getDataEvento('Underground Rock 3', 'Año: 2013 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2013-underground_rock_3.jpg'));
    this.listaEventos2.push(this.objectModelInitializer.getDataEvento('Concierto por los Animales', 'Año: 2014 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2014-concierto_por_animales.jpg'));
    this.listaEventos2.push(this.objectModelInitializer.getDataEvento('3er Concurso de Rock', 'Año: 2014 - Ganadores a mejor guitarrista. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2014-concurso_rock_3.jpg'));
    this.listaEventos2.push(this.objectModelInitializer.getDataEvento('Underground Rock 4', 'Año: 2014 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2014-underground_rock_iv.jpg'));

    this.listaEventos3 = [];
    this.listaEventos3.push(this.objectModelInitializer.getDataEvento('La Guardia Fest', 'Año: 2015 - Banda invitada. Evento realizado en la ciudad de Cúcuta.', 'assets/images/events/2015-guardia_fest.jpg'));
    this.listaEventos3.push(this.objectModelInitializer.getDataEvento('Halloween Trick or Treat', 'Año: 2015 - Banda organizadora. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2015-halloween_trick_or_treat.jpg'));
    this.listaEventos3.push(this.objectModelInitializer.getDataEvento('Night Rock', 'Año: 2015 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2015-rock_nigth.jpg'));
    this.listaEventos3.push(this.objectModelInitializer.getDataEvento('Catatumbo Rock Festival', 'Año: 2016 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2016_catatumbo_rock_festival.jpg'));

    this.listaEventos4 = [];
    this.listaEventos4.push(this.objectModelInitializer.getDataEvento('Concierto de la Fraternidad', 'Año: 2016 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2016-concierto_fraternidad.jpg'));
    this.listaEventos4.push(this.objectModelInitializer.getDataEvento('Pool Party Tattoo', 'Año: 2016 - Banda local. Evento privado realizado en la ciudad de Ocaña.', 'assets/images/events/2016-pool_party_tattoo.jpg'));
    this.listaEventos4.push(this.objectModelInitializer.getDataEvento('Rock al Parche 2', 'Año: 2016 - Banda invitada. Evento realizado en la ciudad de Bucaramanga.', 'assets/images/events/2016-rock_al_parche_2.jpg'));
    this.listaEventos4.push(this.objectModelInitializer.getDataEvento('Rock al Parking', 'Año: 2016 - Banda local. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2016-rock_al_parking.jpg'));

    this.listaEventos5 = [];
    this.listaEventos5.push(this.objectModelInitializer.getDataEvento('Somos Uno', 'Año: 2016 - Banda invitada. Evento realizado en la ciudad de Cúcuta.', 'assets/images/events/2016-somos_uno.jpg'));
    this.listaEventos5.push(this.objectModelInitializer.getDataEvento('Estridente Amanecer', 'Año: 2017 - Banda invitada. Evento realizado en la ciudad de Cúcuta.', 'assets/images/events/2017-estridente_amanecer.jpg'));
    this.listaEventos5.push(this.objectModelInitializer.getDataEvento('Possesed By Metal', 'Año: 2017 - Banda invitada. Evento realizado en la ciudad de Cúcuta.', 'assets/images/events/2017-possesed_by_metal.jpg'));
    this.listaEventos5.push(this.objectModelInitializer.getDataEvento('Diavel Fest - Round 2', 'Año: 2017 - Ganadores del 3er puesto. Evento realizado en la ciudad de Bucaramanga.', 'assets/images/events/2017-round-2-baron-rojo.jpg'));

    this.listaEventos6 = [];
    this.listaEventos6.push(this.objectModelInitializer.getDataEvento('Noche de Blasfemias', 'Año: 2018 - Banda invitada. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2018-noche_de_blasfemias.jpg'));
    this.listaEventos6.push(this.objectModelInitializer.getDataEvento('Beyond the Life and Death', 'Año: 2019 - Banda invitada. Evento realizado en la ciudad de Cúcuta.', 'assets/images/events/2019-beyond_the_life_and_death.jpg'));
    this.listaEventos6.push(this.objectModelInitializer.getDataEvento('Live Session Alternative', 'Año: 2019 - Banda invitada. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2019-live_session_alternativos.jpg'));
    this.listaEventos6.push(this.objectModelInitializer.getDataEvento('Rock On Fire', 'Año: 2019 - Banda invitada. Evento realizado en la ciudad de Bogotá.', 'assets/images/events/2019-rock_on_fire.jpg'));

    this.listaEventos7 = [];
    this.listaEventos7.push(this.objectModelInitializer.getDataEvento('Carnaval Rock', 'Año: 2020 - Banda organizadora. Evento realizado en la ciudad de Ocaña.', 'assets/images/events/2020-carnaval-rock.jpg'));
  }
}