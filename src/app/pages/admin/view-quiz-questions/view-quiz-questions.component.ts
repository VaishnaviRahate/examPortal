import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  //quiz Id and quiz title
  qid = 0;
  qTitle = '';
  questions = [{
    'quesId':0,
    'content':'',
    'option1':'',
    'option2':'',
    'option3':'',
    'option4':'',
    'answer':'',
  }];

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.qid = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    //console.log(this.qid + ' , ' + this.qTitle);
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    )

  }


  //delete queation
  deleteQuestion(quesId:number)
  {
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure?',
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete question
        this.questionService.deleteQuestion(quesId).subscribe(
          (data:any)=>{
            this.questions = this.questions.filter((question)=> question.quesId != quesId)
            Swal.fire('Success','Question deleted successfully!','success');

          },
          (error)=>{
            Swal.fire('Error','Error in deleting question','error');
            console.log(error);
          }
        )
      }
    })
  }

}
