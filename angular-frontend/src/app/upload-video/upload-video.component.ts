import { Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


import { ApiService } from '../api.service';
// import { timeout } from 'rxjs';
import { timeout } from 'rxjs/operators';

//import { setTimeout } from 'timers';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

 inputFileName: '';
  videoSource;
  url;
  // fileInfos:Observable<any>;
  fileInfos;
  filename;
  basename;
  videos;
  splitcount;
  count;


  @ViewChild('videoPlayer') videoplayer: any;


  uploadForm : FormGroup;  
  //event:any;

   

  constructor(private apiService: ApiService, private formBuilder: FormBuilder,  private cd: ChangeDetectorRef) { }

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
   // this.fileInfos = this.apiService.getFile(this.filename);

  }




  onChange(event): void{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      

      this.videoSource = file;
      this.filename= event.target.files[0].name;
      this.basename = this.filename.split('.')[0];


      // console.log(this.param);
      console.log(typeof(this.videoSource));

      this.uploadForm.get('profile').setValue(file);
    };


  }
  
  

    onAddFile(){
      ///
  
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);
  

      var reader = new FileReader();
      reader.readAsDataURL(this.videoSource);
     
      reader.onload = (event) => {
      
        this.url = (<FileReader>event.target).result;
        //console.log(this.url);
      }
   
     
      this.apiService.uploadFile(formData).subscribe((res) => {
        console.log(res);

      this.getFiles(this.basename, res[0]);

      },err=> console.log(err));

      
    

    }


getFiles(file: string, splitcount:Number){ 
   console.log(this.filename);
  
   console.log(this.basename);
   console.log(splitcount);


   this.fileInfos = this.apiService.getFile(file);
  this.fileInfos.subscribe( (videos) => { 
    //console.log("Demo......", this.count);
    if(videos.length == splitcount){
      this.videos = videos;
      console.log("completed split functionality....")
    } else {
      setTimeout(() => {
        console.log("Timeout")
        this.getFiles(this.basename,splitcount);
        videos.length = videos.length+1
        this.cd.markForCheck();
      }, 3000, videos.length);
   }

   
     
  
         //    
     } )
    
  
  
  
  }

}

    //videoSource = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    //console.log(typeof(this.videoSource));

    


/*
    pauseVideo(videoplayer){
      videoplayer.nativeElement.play();
      
    }

*/
  /*
    this can be in onchange event when ever video chosen it plays
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
       
        reader.onload = (event) => {
        
          this.url = (<FileReader>event.target).result;
          //console.log(this.url);
        }
     

      this.uploadForm.get('profile').setValue(file);
      }
      // const filepath = event.target.result;
      // console.log(file);
      // console.log(file.name);
      // console.log(filepath);
      // console.log(this.inputFileName);

      // this.inputFileName= file.name;
      // console.log(this.inputFileName);

      // this.videoSource=this.inputFileName;
      // console.log(this.videoSource);



 if(videos.length < splitcount){
      this.count = setInterval(() => {
        this.getFiles(this.basename,splitcount); 
         }, 3000);
    }
    else{
    this.videos = videos;
     clearInterval(this.count);
    }






      
  

  const myNumber = $timeout(3000);
       myNumber.subscribe(
         (number: number) => {
           console.log(number);
           this.getFiles(this.basename,splitcount)
           myNumber$.unsubscribe(),1000;
         }
       );




 




 const Count = setInterval(() => {
         this.getFiles(this.basename,splitcount); 
         if(videos.length == splitcount){
           clearInterval(Count);
          }
 
           }, 3000);
          




 if(videos.length == splitcount)
    {  
    this.videos = videos
   
    }
     else{  
       console.log(videos);
 

       const Count = setInterval(() => {
        this.getFiles(this.basename,splitcount); 
        if(videos.length == splitcount){
          this.videos = videos
          clearInterval(Count);
         }

          }, 3000);
         





*/


      
     
 
  

