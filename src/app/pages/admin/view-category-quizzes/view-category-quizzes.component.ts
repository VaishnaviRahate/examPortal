import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category-quizzes',
  templateUrl: './view-category-quizzes.component.html',
  styleUrls: ['./view-category-quizzes.component.css']
})
export class ViewCategoryQuizzesComponent implements OnInit {

  //category id = cid, category title= cTitle
  cid=0;
  cTitle='';
  quizzes=[
    {
      qid:23,
      title:'Basic Java Quiz',
      description:'The Java SE is a computing-based platform and used for developing desktop or Window based applications.',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    }

  ];

  constructor(private quizService:QuizService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cid = this.route.snapshot.params['cid'];
    this.cTitle = this.route.snapshot.params['title'];
    //console.log(this.cid + " , " + this.cTitle);
    this.quizService.getQuizzesOfCategory(this.cid).subscribe(
      (data:any)=>{
        console.log(data);
        this.quizzes = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteQuiz(qid:number)
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
          this.quizService.deleteQuiz(qid).subscribe(
            (data)=>{
      
              this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid);
              Swal.fire('Success','Quiz deleted successfully!','success');
            },
            (error)=>{
              Swal.fire('Error','Error in deleting quiz','error');
            }
          );
        }

      });
  }

}
