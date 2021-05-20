import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent implements OnInit {

inputFileName: string;

  @ViewChild('videoPlayer') videoplayer: any;


  uploadForm : FormGroup;  
  event:any;


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
      this.uploadForm.get('profile').setValue(file);

      
    };
  }

    onAddFile(){
      ///
  
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('profile').value);
  
      // const params = {
      //   name: this.name,
      //    path : this.path
      // };
  
      this.apiService.uploadFile(formData).subscribe((res) => {
        console.log(res);
      },err=> console.log(err));
    }



}
