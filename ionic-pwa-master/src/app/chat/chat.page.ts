import { Component, OnInit } from '@angular/core';
import { ToastController} from "@ionic/angular";
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import { ParamServiceService} from "../param-service.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

    messages = [];
    nickname = '';
    message = '';

    constructor(private paramService: ParamServiceService, private socket: Socket,
                private toastCtrl: ToastController, private router: Router, private route: ActivatedRoute) {
        this.nickname = this.paramService.getDestn().nickname;




        this.getMessages().subscribe(message => {
            this.messages.push(message);
        });

        this.getUsers().subscribe(data => {
            let user = data['user'];
            if (data['event'] === 'left') {
                this.showToast('User left: ' + user);
            } else {
                this.showToast('User joined: ' + user);
            }
        });
    }

    sendMessage() {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket.on('message', (data) => {
                observer.next(data);
            });
        })
        return observable;
    }

    getUsers() {
        let observable = new Observable(observer => {
            this.socket.on('users-changed', (data) => {
                observer.next(data);
            });
        });
        return observable;
    }

    ionViewWillLeave() {
        this.socket.disconnect();
    }

    showToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
      //  toast.present();
    }
}
