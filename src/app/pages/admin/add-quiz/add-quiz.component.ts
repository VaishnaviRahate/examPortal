import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories = [
    {
      cid:0,
      title:''
    }

  ];


  quizData = {
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category: {
      cid:'',
    },
  };

  constructor(private categoryService:CategoryService,private snack:MatSnackBar,
              private quizService:QuizService, private router:Router) { }

  ngOnInit(): void {

    this.categoryService.categories().subscribe(
      (data:any)=>{
        //categories load successfully
        this.categories = data;
        console.log(this.categories);
      },

      //if error 
      (error)=>{
        //console.log(error);
        Swal.fire('Error','Error in loading data from server','error');
      }

    );


  }

  //add quiz
  addQuiz(){

    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      this.snack.open("Title Required!!",'',{
        duration:3000,
      });
      return;
    }

    //here add validations
    if(this.quizData.description.trim()=='' || this.quizData.description==null)
    {
      this.snack.open("Description Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.quizData.maxMarks.trim()=='' || this.quizData.maxMarks==null)
    {
      this.snack.open("Enter maximum marks of the respective quiz.",'',{
        duration:3000,
      });
      return;
    }

    if(this.quizData.numberOfQuestions.trim()=='' || this.quizData.numberOfQuestions==null)
    {
      this.snack.open("Please enter number of questions needed to be present in the quiz.",'',{
        duration:3000,
      });
      return;
    }

    if(this.quizData.category.cid =='' || this.quizData.category.cid==null)
    {
      this.snack.open("Please select appropriate category of the quiz.",'',{
        duration:3000,
      });
      return;
    }


    //call server
    this.quizService.addQuiz(this.quizData).subscribe(
      (data)=>{
        Swal.fire('Success','Quiz added successfully!!','success');
        this.router.navigate(['/admin-dashboard/quizzes']);

      },

      (error)=>{
        Swal.fire('Error','Error while adding quiz','error');
        console.log(error);
      }
    );
    
  }


}
