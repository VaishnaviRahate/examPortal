import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {


  qid = 0;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
      title: '',
    },
  };

  categories: any;


  constructor(private route: ActivatedRoute, private quizService: QuizService,
    private categoryService: CategoryService, private snack: MatSnackBar,
    private router:Router) { }

  ngOnInit(): void {

    this.qid = this.route.snapshot.params['qid'];
    //alert(this.qid);

    //to get all details of quiz on which we clicked on update button
    this.quizService.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );

    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        this.snack.open("Error in loading categories..", '', {
          duration: 3000,
        });
      }
    );

  }

  //update form submit
  public updateQuiz(){
    
    //validations
    if(this.quiz.title.trim()=='' || this.quiz.title==null)
    {
      this.snack.open("Title Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.quiz.description.trim()=='' || this.quiz.description==null)
    {
      this.snack.open("Description Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.quiz.maxMarks.trim()=='' || this.quiz.maxMarks==null)
    {
      this.snack.open("Enter maximum marks of the respective quiz.",'',{
        duration:3000,
      });
      return;
    }

    if(this.quiz.numberOfQuestions.trim()=='' || this.quiz.numberOfQuestions==null)
    {
      this.snack.open("Please enter number of questions needed to be present in the quiz.",'',{
        duration:3000,
      });
      return;
    }

    if(this.quiz.category.cid =='' || this.quiz.category.cid==null)
    {
      this.snack.open("Please select appropriate category of the quiz.",'',{
        duration:3000,
      });
      return;
    }

    this.quizService.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire('Success','Quiz updated successfully!!','success')
        .then((result)=>{
          if(result)
          {
            this.router.navigate(['/admin-dashboard/quizzes']);
          }
        });
        
      },
      (error)=>{
        Swal.fire('Error','Error in updating quiz','error');
        console.log(error);
      }
    );
  }

}
