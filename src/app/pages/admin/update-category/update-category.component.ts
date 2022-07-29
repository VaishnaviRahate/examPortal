import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  cid=0;
  category = {
    title: '',
    description: '',
  }
  constructor(private route: ActivatedRoute,private categoryService:CategoryService,
              private snack: MatSnackBar, private router:Router) { }

  ngOnInit(): void {

    this.cid = this.route.snapshot.params['cid'];
    //alert(this.cid);

    //to get all details of category on which we clicked on update button
    this.categoryService.getCategory(this.cid).subscribe(
      (data:any)=>{
        this.category = data;
        console.log(this.category);
      },
      (error)=>{
        console.log(error);
      }
    );


  }

  //update form submit
  public updateCategory(){
    
    //validations
    if (this.category.title.trim() == '' || this.category.title == null) {
      this.snack.open("Title Required!!", '', {
        duration: 3000,
      });
      return;
    }

    this.categoryService.updateCategory(this.category).subscribe(
      (data:any)=>{
        Swal.fire('Success','Category updated successfully!!','success')
        .then((result)=>{
          if(result)
          {
            this.router.navigate(['/admin-dashboard/categories']);
          }
        });
      },
      (error)=>{
        Swal.fire('Error','Error in updating category','error');
        console.log(error);
      }
    );
  }

}
