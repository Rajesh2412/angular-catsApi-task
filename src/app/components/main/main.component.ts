import { Component, OnInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  catsList :any ;
  ifUpVoted = false;
  ifDownVoted = false;
  isLoaded = false;
  constructor(public interaction:InteractionService,
    ) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.interaction.getCatsList().subscribe((res)=>{
      console.error(res)
      if(res.length > 0){
        this.isLoaded = true
        this.catsList = res;
        this.getMyFav()
        this.getMyVotes()
      }else{
        //handle the error here
        this.isLoaded = true;
      }
    })

    
  }

  getMyVotes(){
    const votesIds:any = []
    this.interaction.getMyVotes().subscribe((res)=>{
      console.log("fffffffffff",res)
      if(res.length == 0 || res.length >= 0){
        res.map((ele:any)=>{
         votesIds.push(ele)
        })
       }
       votesIds.map((ele:any,index:any) =>{
        this.catsList.map((ele1:any)=>{
          if(ele1.id === ele.image_id && ele1.sub_id === ele.sub_id){
            ele1['voteType'] = res[index].value;
            ele1['vote_id'] = res[index].id
          }
        })
      })
      console.log(this.catsList)
    })
  }

  upVote(id:string,index:number){
  this.interaction.upVote(id).subscribe((res)=>{
  if(res.message == 'SUCCESS'){
    const vote = {
      id : res.id,
      value:1
    }
   this.catsList[index]['vote'] = vote;
  }
})
  }

  downVote(id:string,index:number){
    this.interaction.downVote(id).subscribe((res)=>{
      if(res.message == 'SUCCESS'){
        const vote = {
          id : res.id,
          value:0
        }
       this.catsList[index]['vote'] = vote;
       this.getMyVotes()
      }
    })
  }

  dealFav(id:string, type:string,index:number){
    if(type === 'add'){
      this.interaction.addMyFavourite(id).subscribe(res=>{
        if(res.message == 'SUCCESS'){
          this.catsList[index]['favourite'] = true;
          this.catsList[index]['favourite_id'] = res.id
        }
        
      })
    } else if(type === 'delete'){
      this.interaction.deleteMyFavourite(id).subscribe(res=>{
        console.log(res)
        if(res.message == 'SUCCESS'){
          this.catsList[index]['favourite'] = false;
          this.catsList[index]['favourite_id'] = res.id
        }
        // this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
      })
    }
  }

  getMyFav(){
    const favIds:any = [];
    this.interaction.getMyFavList().subscribe((res)=>{
      console.log(res)
      if(res.length == 0 || res.length >= 0){
       res.map((ele:any)=>{
        favIds.push(ele.image_id);
       })
      }
      console.log(favIds)
      favIds.map((ele:any,index:any) =>{
        this.catsList.map((ele1:any)=>{
          if(ele1.id === ele ){
            ele1['favourite'] = true;
            ele1['favourite_id'] = res[index].id
          }
        })
      })

      console.log(this.catsList)
    })

  }


  getScore(item:any){
return item?.vote  ? item?.vote?.value : 0
  }

}
