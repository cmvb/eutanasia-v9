import { Injectable } from '@angular/core';
import { ObjectModelInitializer } from 'src/app/config/ObjectModelInitializer';
import { ToqueModel } from 'src/app/model/toque-model';
import { PostModel } from 'src/app/model/post-model';

@Injectable({
  providedIn: 'root'
})
export class EutanasiaService {
  // Datos
  post: PostModel;
  listaPost: PostModel[];
  listaEventos: ToqueModel[];

  constructor(public objectModelInitializer: ObjectModelInitializer) {
  }

  inicializar() {
  }

}
