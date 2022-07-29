import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  qid=0;
  qTitle='';
  quesId=0;
  question={
    quiz:{
      qid:0,
      title:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    image:'',

  };

  constructor(private route:ActivatedRoute,private questionService:QuestionService,
              private snack: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.quesId = this.route.snapshot.params['quesId'];
    //alert(this.quesId);

    this.questionService.getQuestion(this.quesId).subscribe(
      (data: any) =>{
        this.question = data;
        console.log(this.question);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  //pending -- bcoz at backend getting error
  updateQuestion(){
    //validations
    if(this.question.content.trim() == '' || this.question.content == null)
    {
      this.snack.open("Question Content Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.question.option1.trim() == ''  || this.question.option1 == null)
    {
      this.snack.open("Option1 Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.question.option2.trim() == ''  || this.question.option2 == null)
    {
      this.snack.open("Option2 Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.question.option3.trim() == ''  || this.question.option3 == null)
    {
      this.snack.open("Option3 Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.question.option4.trim() == ''  || this.question.option4 == null)
    {
      this.snack.open("Option4 Required!!",'',{
        duration:3000,
      });
      return;
    }

    if(this.question.answer.trim() == ''  ||this.question.answer == null)
    {
      this.snack.open("Answer Required!!",'',{
        duration:3000,
      });
      return;
    }

    this.questionService.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire('Success','Question updated successfully!!','success')
        .then((result)=>{
          if(result)
          {
            this.router.navigate(['/admin-dashboard/view-questions/'+this.question.quiz.qid+'/'+this.question.quiz.title]);
          }
        });
      },
      (error)=>{
        Swal.fire('Error','Error in updating question','error');
        console.log(error);
      }
    )
  }
}
