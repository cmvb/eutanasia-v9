import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Guardian } from './Guardian';
import { HomeComponent } from '../components/home/home.component';
import { BlogComponent } from '../components/blog/blog.component';
import { ActivateUserComponent } from '../components/activate-user/activate-user.component';
import { RecordarClaveComponent } from '../components/recordar-clave/recordar-clave.component';
import { PostComponent } from '../components/post/post.component';
import { EnviarMailComponent } from '../components/enviar-mail/enviar-mail.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { PromoComponent } from '../components/promo/promo.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [Guardian] },
  { path: 'blog/:idPost', component: BlogComponent, canActivate: [Guardian] },
  { path: 'post', component: PostComponent, canActivate: [Guardian] },
  { path: 'recordarClave/:tokenUsuario', component: RecordarClaveComponent, canActivate: [Guardian] },
  { path: 'activateUser/:tokenActivar', component: ActivateUserComponent, canActivate: [Guardian] },
  { path: 'enviarMail', component: EnviarMailComponent, canActivate: [Guardian] },
  { path: 'timeline', component: TimelineComponent, canActivate: [Guardian] },
  { path: 'promo', component: PromoComponent, canActivate: [Guardian] },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
