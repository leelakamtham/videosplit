import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

 inputFileName: '';
  videoSource;
  url;

  @ViewChild('videoPlayer') videoplayer: any;


  uploadForm : FormGroup;  
  //event:any;

   

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });

  }




  onChange(event): void{
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.videoSource = file;

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
      },err=> console.log(err));

      
    

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


*/


      
     
 
  

