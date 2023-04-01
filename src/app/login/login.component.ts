import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //variables
  user: any = {};
  pass: string = ""
  usuarioInvalido: boolean = false;
  msjUsuarioInvalido: String = "El usuario o contraseña son incorrectas."



  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    localStorage.clear()
    this.limpiar()

  }


  formulariologin() {
    this.usuarioInvalido = false
    console.log("entro en formulario")
    let formularioValido: any = document.getElementById("loginForm");


    if (formularioValido.reportValidity()) {

      //llamada al servicio de login
      this.servicioLogin().subscribe(
        (respuesta: any) => this.login(respuesta)
      )
    }
  }
  servicioLogin() {

    if(this.user.usuario !== undefined ){
      this.user.usuario = this.user.usuario.toUpperCase()

    }else{
      console.log("no existe en la db")
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>("http://localhost:4043/usuario/login", this.user, httpOptions).pipe(
      catchError(e => "e")
    )

  }
  login(res: any) {

    if (res != null) {
      //recibido

      res = JSON.parse(JSON.stringify(res))
      console.log(res)

      if(res.idUsuario != null && res.usuario != ""){
        // Usuario OK
        this.user = res
        localStorage.setItem("user", JSON.stringify(this.user));
        res = null
        location.href = "/home";
      }else{
        // Fallo por -> 'estado'
        this.usuarioInvalido = true

      }
    } else if (res == null){
      this.usuarioInvalido = true

    } else if (res == "e") {
      alert("No hay comunicación con el servidor!!")
    }
  }

  limpiar(){
    this.user = {};
    this.pass  = ""
    this.usuarioInvalido = false;
    this.msjUsuarioInvalido = "El usuario o contraseña son incorrectas."
  }


}
