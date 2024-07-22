import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLoginAuthenticationType } from '@po-ui/ng-templates';
import { environment } from 'src/environments/environment';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private router: Router,
    private service: LoginService
  ) { }

  user = '';
  apiURL = environment.url + '/auth/login';
  authenticationType: PoPageLoginAuthenticationType = PoPageLoginAuthenticationType.Bearer;

  ngOnInit(): void {
    if (sessionStorage.getItem('reloadOk') === 'reload') {
      this.router.navigateByUrl(`/main/reserv`);
    }
  }

  login(credenciais: any) {
    this.doLogin(
      credenciais.login,
      credenciais.password,
      credenciais.rememberUser
    );
  }
  doLogin(login: string, password: string, rememberUser: boolean) {
    sessionStorage.setItem('loginUser', login);
  
    this.service.login(login, password).subscribe(
      (response) => {
        const { token, admin } = response;
        console.log('Token recebido:', token); // Adicione este log
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('groupAdmin', admin);
        this.router.navigateByUrl(`/main/home/${new Date().getTime()}`);
      },
      (error) => {
        console.error('Erro no login:', error); // Adicione este log
      }
    );
  }

}
  
