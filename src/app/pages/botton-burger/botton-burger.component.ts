import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/loading.service';

@Component({
  selector: 'app-botton-burger',
  templateUrl: './botton-burger.component.html',
  styleUrls: ['./botton-burger.component.css']
})
export class BottonBurgerComponent implements OnInit {

  constructor(private loadingService:LoadingService,
    private router:Router) { }


  goToMenu(){
    this.loadingService.showNavBar=false;
    this.router.navigate(['/menu'])
  }

  ngOnInit(): void {
  }

}
