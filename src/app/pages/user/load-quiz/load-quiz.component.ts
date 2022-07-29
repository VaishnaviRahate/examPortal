import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cid = 0;
  quizzes = [
    {
      qid: 0,
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
      category: {
        title: ''
      }
    }

  ];

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.cid = params['cid'];
      //console.log(this.cid);

      if (this.cid == 0) {
        //alert("load all quiz..");
        this.quizService.quizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in loading all quizzes', 'error');
          }
        )

      }
      else {
        //alert("Load specific quiz");
        this.quizService.getQuizzesOfCategory(this.cid).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            console.log(error);
            Swal.fire('Error', 'Error in loading all quizzes', 'error');
          }
        )

      }
    })



  }

}
