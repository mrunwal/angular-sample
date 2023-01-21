import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShortUserInfo, storageKey } from '@app/_models';
import { GithubService, LocalService } from '@app/_services';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, OnDestroy {
  UsersSearch !: ShortUserInfo[];
  constructor(    
    private githubService: GithubService,
    private localService: LocalService
  ) { }
  ngOnInit(): void {
    this.UsersSearch =this.localService.getData(storageKey)??[];
    console.log(this.UsersSearch);
  }
  ngOnDestroy(): void {
    
  }
}
