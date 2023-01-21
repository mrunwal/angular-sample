import { Injectable } from '@angular/core';
//import { ShortUserInfo, UserInfo } from '@app/_models';
import { ShortUserInfo, UserInfo } from '../_models';
@Injectable({
  providedIn: 'root'
})
export class LocalService {
  shortUserInfo !: ShortUserInfo[]; 
  constructor() { }

  public saveData(key: string, value: ShortUserInfo) {
    //First check the key exists or not.
    this.shortUserInfo = this.getData(key)?? [] ;
      //If the key exists, then check the value exists or not.
      if(this.shortUserInfo.length){
        //If the value does not exist, then push the value into the array.
        this.shortUserInfo.push(value);
      }else{
        //If the value exists, then update the value.
        this.shortUserInfo = [value];
      }

    localStorage.setItem(key, JSON.stringify(this.shortUserInfo));
  }

  public getData(key: string): ShortUserInfo[] | null {
    return JSON.parse(localStorage.getItem(key)|| '[]');
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
