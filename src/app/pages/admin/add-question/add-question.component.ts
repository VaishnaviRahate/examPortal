import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  //public Editor = ClassicEditor;

  //qid == quiz id
  //qTitle == quiz Title
  qid=0;
  qTitle='';
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
              private snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {

    this.qid = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qid;
    this.question.quiz['title'] = this.qTitle;

  }

  addQuestion(){

    //validations
   if(this.question.content.trim() == '' || this.question.content == null)
   {
    this.snack.open("Question Content Required!!",'',{
      duration:3000,
    });
    return;
   }

   if(this.question.option1.trim() == '' || this.question.option1 == null)
   {
    this.snack.open("Option1 Required!!",'',{
      duration:3000,
    });
    return;
   }

   if(this.question.option2.trim() == '' || this.question.option2 == null)
   {
    this.snack.open("Option2 Required!!",'',{
      duration:3000,
    });
    return;
   }

   if(this.question.option3.trim() == '' || this.question.option3 == null)
   {
    this.snack.open("Option3 Required!!",'',{
      duration:3000,
    });
    return;
   }

   if(this.question.option4.trim() == '' || this.question.option4 == null)
   {
    this.snack.open("Option4 Required!!",'',{
      duration:3000,
    });
    return;
   }

   if(this.question.answer.trim() == '' || this.question.answer == null)
   {
    this.snack.open("Answer Required!!",'',{
      duration:3000,
    });
    return;
   }

   //submit form with the help of service
   this.questionService.addQuestion(this.question).subscribe(
     (data:any)=>
     {
        Swal.fire('Success','Question added successfully!','success')
        .then((result)=>{
          if(result)
          {
            this.router.navigate(['/admin-dashboard/view-questions/'+this.question.quiz.qid+'/'+this.question.quiz.title]);
          }
        })
     },
     (error)=>
     {
      Swal.fire('Error','Error in adding question','error');
     }
   )

  }
}
