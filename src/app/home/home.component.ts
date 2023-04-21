import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persona:any = []
  usuario:any = {}

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.consultaPersona().subscribe(
      (respuesta:any) => this.RecibioRespuesta(respuesta)
    )
  }


  consultaPersona(){


     this.usuario =    localStorage.getItem("user")
    this.usuario =    JSON.parse(this.usuario)


    var httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'

      })
    }
    return this.http.get<any>("http://localhost:4043/usuario/consulta/" + this.usuario.usuario, httpOptions).pipe(
      catchError(e=>"e")
    )
  }

  RecibioRespuesta(res:any){
    this.persona = res
    console.log(this.persona)
  }
}
