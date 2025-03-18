import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StepDataService {
  // baseUrl = 'http://59.144.172.41:8096/api';
  baseUrl = 'http://localhost:26255/api';
  apiName :any;
  constructor(private http:HttpClient) { }

  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.http.post('http://localhost:4200/', formParams)
  }

  // downloadFile(CSVFName:string, userId:string,):any{
  //   this.apiName='Files/files';
  //   // debugger;
  //   let queryParams= new HttpParams();
  //   queryParams= queryParams.append("CSVFName", CSVFName);
  //   queryParams = queryParams.append("userId",userId);
  
  //   // return this.http.get('http://59.144.172.41:8096/API/Files/files', {responseType:'blob', params:queryParams});
  //      return this.http.get(this.baseUrl + '/' + this.apiName, {responseType:'blob', params:queryParams});
  // }

  // StepToXml/UpdateStep
   exportStep(data: any){
    this.apiName='StepToXml/UpdateStep';
  return this.http.post(this.baseUrl+"/"+this.apiName, data,{responseType:'text'});
  } 
}
