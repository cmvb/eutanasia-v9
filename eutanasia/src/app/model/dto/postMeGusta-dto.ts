import { MeGustaModel } from '../meGusta-model';
import { PostModel } from '../post-model';

export interface PostMeGustaDTOModel {
    promedioCalificacion;
    postTB: PostModel;
    listaMeGusta: MeGustaModel[];
}