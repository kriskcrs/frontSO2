import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  empleados:any = []

  constructor(private http: HttpClient) { }

  ngOnInit(): void {


    this.consultaEmpleados().subscribe(
      (respuesta:any) => this.RecibioRespuesta(respuesta)
    )
  }


  consultaEmpleados(){
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
    this.empleados = res
    console.log(res)
    console.log(this.empleados)
  }
}
