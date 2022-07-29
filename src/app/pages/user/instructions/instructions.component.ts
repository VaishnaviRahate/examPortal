import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qid=0;
  quiz = {
      qid: 0,
      title: '',
      description: '',
      maxMarks:0,
      numberOfQuestions:0,
      active: '',
      category: {
        title: ''
      }
  };




  constructor(private route:ActivatedRoute,private quizService:QuizService,
              private router:Router) { }

  ngOnInit(): void {

    this.qid = this.route.snapshot.params['qid'];
    //alert(this.qid);
    this.quizService.getQuiz(this.qid).subscribe(
      (data:any)=>{
        //console.log(data);
        this.quiz = data;
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error in loading quiz data','error');
      }
    )
  }

  startQuiz()
  {
    Swal.fire({
      title: 'Do You Want To Start The Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Start',
      denyButtonText: `Don't Start`,
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/start-quiz/' + this.qid]);
      }
    })

    
  }

}
