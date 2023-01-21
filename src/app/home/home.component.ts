import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
//import { UserInfo, UserInfoRes, storageKey, ShortUserInfo } from '@app/_models';
import { UserInfo, UserInfoRes, storageKey, ShortUserInfo } from '../_models';
import { GithubService, LocalService } from '@app/_services'

import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit, OnDestroy  {
  form !: FormGroup
  sub$ = new Subject<void>();
  users !: UserInfo[];
  constructor(
    private fb: FormBuilder,
    private githubService: GithubService,
    private localService: LocalService
  ) { }
  ngOnInit(): void {
    console.log('test');
    this.form = this.fb.group({
      name: [''],
    })
  }
  getResults(){
    console.log(this.form.value)
    this.githubService.searchUsers(this.form.value.name)
    .pipe(
      takeUntil(this.sub$) //This will take care of unsubscribing
    )
    .subscribe({
      next: (res: UserInfoRes) => {
        this.users = res.items;
        let storageData: ShortUserInfo ;
        storageData = {'search' : this.form.value.name, items: res.items }
        this.localService.saveData(storageKey, storageData );
      },
      error: (err: any) => {
      }
    })
  }
  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }
}
