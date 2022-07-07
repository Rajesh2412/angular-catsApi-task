import { Component } from '@angular/core';
import { InteractionService } from './services/interaction.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-task';
  constructor(public interaction:InteractionService){

  }

  ngOnInit(){
    this.interaction.getCatsList()
  }

  imageUploaded(event:any){
    
    this.interaction.uploadTheCat(event.target.files[0])

  }
}
