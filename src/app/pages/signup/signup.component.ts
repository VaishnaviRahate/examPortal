import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username: '',
    password: '',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  };

  constructor(private userService: UserService, private snack:MatSnackBar,private router: Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('Username is required!!','',{
        duration:3000,
        // verticalPosition:'top',
        // horizontalPosition:'right'
      });
      return;
    }



    //validate


    //addUser(): userService
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        console.log(data);
        Swal.fire('Success','User Registered Successfully! User Id is ' + data.id,'success');
        this.router.navigate(['/login']);
      },
      (error)=>{
        //error
        console.log(error);
        this.snack.open('Something Went Wrong!!','',{
          duration:3000
        });
      }
    )
  }

  public clear()
  {
    this.user.username = '',
    this.user.password = '',
    this.user.firstName = '',
    this.user.lastName = '',
    this.user.email = '',
    this.user.phone = ''
  }
  
}
