import { Component, ElementRef, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  alert_msg = '';
  disable = false;
  constructor(public interaction:InteractionService,
    public elementRef : ElementRef,
    public router : Router) { }

  ngOnInit(): void {
  }

  imageUploaded(event:any){
    this.disable = true;
    if(event.target.files[0].type == 'image/jpeg' || 'image/jpg'){
      this.interaction.uploadTheCat(event.target.files[0]).subscribe((res)=>{
        console.log(res)
        if(res.approved == 1){
          this.disable = false;
          this.router.navigate(['/'])
        }
      },
      error =>{
        if(error.status == 400){
          this.disable = false;
          this.alert_msg = error.error.message;
          setTimeout(()=>{
            this.alert_msg = ''
          },3000)
        }
      }
      )
    }else{
      this.disable = false;
      this.alert_msg = 'Select image only';
      setTimeout(()=>{
        this.alert_msg = ''
      },2000)
    }

  }
}
