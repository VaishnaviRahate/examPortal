import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private snack: MatSnackBar, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required!!", '', {
        duration: 3000
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required!!", '', {
        duration: 3000
      });
      return;
    }

    //request to server to generate token here
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('Token generated successfully..');
        console.log(data); //data which is coming from backend i.e.token

        //Login Here -- 1) Save the generated token in local storage 
        //  2) Save the current user details in local storage 
        //  3) Redirect the user to respective page according to their role 

        //1)Save Token in Local Storage
        this.loginService.loginUser(data.token);

        //2)Save Current USer Details in Local Storage
        this.loginService.getCurrentUser().subscribe(
          (user: any) => {
            this.loginService.setUser(user);
            console.log(user);

            //3)Redirect User=> ADMIN -> admin-dashboard & NORMAL -> normal-dashboard
            if (this.loginService.getUserRole() == 'ADMIN') {
              //admin dashboard
              //window.location.href='/admin-dashboard';
              this.router.navigate(['admin-dashboard']);
              this.loginService.loginStatusSubject.next(true); //this next method will basically send notification 
              // to pages/components which have had suscribed to this subject
              // so here navbar.ts had subscribed this subject(check on that)
            }
            else if (this.loginService.getUserRole() == 'NORMAL') {
              //normal user dashboard
              //window.location.href='/user-dashboard'; //this will reload page
              this.router.navigate(['user-dashboard/0']); //this will not reload page //here we are providing '0' in url bcoz after successful login
                                                          // we need to load all quizzes on user-dashboard 
              this.loginService.loginStatusSubject.next(true);
            }
            else {
              this.loginService.logout();
            }
          }
        );

      },
      (error) => {
        console.log('Error!');
        console.log(error);
        this.snack.open("Invalid Details!! Try again", '', {
          duration: 3000
        });
      }
    );


  }
}
