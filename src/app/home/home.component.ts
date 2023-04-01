import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any=[]
  reservaciones1:any = []
  reservaciones2:any = []
  reservaciones:any = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = localStorage.getItem("user");
    console.log(this.reservaciones[1])
    console.log(this.reservaciones1)
    console.log(this.reservaciones2)
    /*if(){

    }*/

    this.consultarEncomiendas().subscribe(
      (respuesta:any) => this.RecibioRespuesta(respuesta)
    )
  }


  consultarEncomiendas(){
    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'

      })
    }
    return this.http.get<any>("http://localhost:4043/empleado/consulta", httpOptions).pipe(
      catchError(e=>"Error al realizar el el /findOne")
    )
  }

  RecibioRespuesta(res:any){
    this.reservaciones = res
    this.reservaciones1 = res
  }
}
