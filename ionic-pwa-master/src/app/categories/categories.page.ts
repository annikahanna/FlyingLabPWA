import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Socket} from 'ng-socket-io';
import {ParamServiceService} from "../../param-service.service";

@Component({
    selector: 'app-categories',
    templateUrl: './categories.page.html',
    styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

    frankfurt: boolean = false;
    hack: boolean = false;
    tech: boolean = false;
    food: boolean = false;
    theme: string = '';
    nickname = '';

    constructor(private router: Router, private http: HttpClient, private socket: Socket,
                private paramService: ParamServiceService) {
    }

    ngOnInit() {
    }

    postUser(user) {
        const test = this.http.post('https://hackfrankfurtbbtest.azurewebsites.net/api/createUser?code=yTX6MLahsb3KbX1kiSg77bfVPxq1fGVxi7XFKobGb7ssaaQZRlFWOQ==', user).subscribe(
            (data) => {
                console.log("callback Post" + data);
            }
        )
    }

    buildUser(topic, questionString) {
        var obj = {
            name: "Hier Random eintragen?",
            topic: "Hier Topic reinparsen?",
            question: questionString,
            paired: false
        }
        return obj;
    }

    chooseFrankfurt() {
        this.frankfurt = true;
        var temp = this.buildUser("frankfurt", "Have you heard about the Frankfurter “grüne Soße”?");
        this.postUser(temp);

        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);

        this.paramService.setDestn({nickname: this.nickname})
        this.router.navigate(['/chat'])


    }

    chooseHack() {
        this.hack = true;
        "How many hours did you sleep last night?";
        var temp = this.buildUser("hack", "How many hours did you sleep last night?");
        this.postUser(temp);
    }

    chooseTech() {
        this.tech = true;
        var temp = this.buildUser("tech", "Windows or Mac or Linux?");
        this.postUser(temp);
    }

    chooseFood() {
        this.food = true;

        var temp = this.buildUser("food", "How did you like Sissis’ legendary Currywurst during the Hackdays?");
        this.postUser(temp);
    }

    joinChat() {

        this.socket.connect();
        this.socket.emit('set-nickname', this.nickname);

        this.paramService.setDestn({ nickname: this.nickname })
        this.router.navigate(['/chat'] )


    }


}
