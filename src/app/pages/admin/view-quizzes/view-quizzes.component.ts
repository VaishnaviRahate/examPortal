import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

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

  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.quizzes().subscribe(
    (data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
    },
    (error)=>{
      console.log(error);
      Swal.fire('Error','Erro in loading data!!','error');
    }
    );
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
