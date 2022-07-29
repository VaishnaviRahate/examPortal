import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories = [
    {
      cid: 0,
      title: String,
      description: String
    }
  ];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any) =>
    {
      this.categories = data;
      console.log(this.categories);
    },
    (error) =>{
      console.log(error);
      Swal.fire("Error!!" ,"Error in loading data","error");
    });

  }

  //incomplete
  deleteCategory(cid:number)
  {
    Swal.fire({
      icon: 'info',
      title:"Are you sure?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete quiz
        this.categoryService.deleteCategory(cid).subscribe(
          (data)=>{
    
            this.categories = this.categories.filter((category) => category.cid != cid);
            Swal.fire('Success','Category deleted successfully!','success');
          },
          (error)=>{
            Swal.fire('Error','Error in deleting category','error');
          }
        );
      }

    });  
  }

}
