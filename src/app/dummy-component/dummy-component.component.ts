import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Retail } from './imsrc';

@Component({
  selector: 'app-dummy-component',
  templateUrl: './dummy-component.component.html',
  styleUrls: ['./dummy-component.component.scss']
})
export class DummyComponentComponent implements OnInit {
  @Input() title: String='';

  showsecret = false;
  log: Number[] = [];
  imageSource: String = '';
  retail: Retail[] =[{
    name:'Google', imgSrc:'assets/Images/Sample.jpg'
  }];
  data={};
  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.httpClient.get('/assets/Json/sample.json').subscribe(data => {
      this.data = data;
      console.log('Data Received:', this.data);
    });
  }
  doLogin(){
    console.log('Login Clicked:');
    this.auth.login('atul','123456');
    this.auth.sendTestAPI()
  }
}


