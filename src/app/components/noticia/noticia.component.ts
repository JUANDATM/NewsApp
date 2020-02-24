import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';




@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, private dataLocalService: DataLocalService, private socialsharing: SocialSharing, private actionSheetController: ActionSheetController, private plataform: Platform) { }

  ngOnInit() {
  }

  abrirNoticia() {
// console.log('noticia :', this.noticia.url);
const browser = this.iab.create(this.noticia.url, '_system');
}

async lanzarMenu() {
  let guardarBorrarBtn;

  if (this.enFavoritos) {
    guardarBorrarBtn = {
      text: 'Borrar de Favoritos ',
      icon: 'trash-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Favorito Borrado');
        this.dataLocalService.borrarNoticia(this.noticia);
      }
    };
  } else {
    guardarBorrarBtn = {
      text: 'Agregar a Favoritos ',
      icon: 'heart-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Favorito Agregado');
        this.dataLocalService.guardarNoticia(this.noticia);
      }
    };
  }


  const actionSheet = await this.actionSheetController.create({
    buttons: [
      guardarBorrarBtn
      , {
      text: 'Compartir',
      icon: 'share-outline',
      cssClass: 'action-dark',
      handler: () => {
        console.log('Compartir clicked');
        this.compartirNoticia();
      }
    },
    {
      text: 'Cancel',
      icon: 'close',
      cssClass: 'action-dark',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}

compartirNoticia() {
   if ( this.plataform.is('cordova')) {
    this.compartirNoticia();
    this.socialsharing.share(
      this.noticia.title,
      this.noticia.source.name,
      '',
      this.noticia.url
    );
   } else {
    if (navigator['share']) {
      navigator['share']({
        title: this.noticia.title,
        text: this.noticia.description,
        url: this.noticia.url,
      })
        .then(() => console.log('Compartido Exitosamente'))
        .catch((error) => console.log('Error al Compartir', error));
    }
   }
}
}
