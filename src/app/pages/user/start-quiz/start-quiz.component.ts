import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  //qid: quiz Id
  qid=0;
  questions = [{
    'quesId':0,
    'content':'',
    'option1':'',
    'option2':'',
    'option3':'',
    'option4':'',
    'answer':'',
    'givenAnswer':'',
    'quiz':{
      'qid':0,
      'title':'',
      'description':'',
      'maxMarks':0,
      'numberOfQuestions':0,
      'category':{
        'cid' : 0,
        'title' : '',
        'description' :'',
      }
    },
  }];

  marksGot = 0;
  correctAnswers = 0;
  attemptedQuestions = 0;
  
  isSubmit = false;

  timer:any;

  constructor(private locationStrategy:LocationStrategy,private route:ActivatedRoute,
              private questionService:QuestionService,private router:Router) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this.route.snapshot.params['qid'];
    //console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions()
  {
    this.questionService.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data:any)=>{
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.startTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Error In Loading Questions Of Quiz','error');
      }
    )
  }

  //once quiz started..it cannot go back..
  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,'',location.href);
    });
  }

  submitQuiz()
  {

    Swal.fire({
      title: 'Do You Want To Submit The Quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evalQuiz();
      }
    });


  }

  //If time out of quiz, then it will get automatically submitted without asking for submit swal
  evalQuiz()
  {

    //call to server to check questions
    this.questionService.evalQuiz(this.questions).subscribe(
      (data :any)=>{
        //console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attemptedQuestions = data.attemptedQuestions;
        this.isSubmit = true;
      },
      (error)=>{
        console.log(error);
      }
    )

    //client side calculation --but here we comment it bcoz we did same calculation on server side.
    // this.isSubmit = true;
    // console.log(this.questions);

    // this.questions.forEach(q=>{

    //   if(q.givenAnswer == q.answer)
    //   {
    //     this.correctAnswers++;
    //     let marksOfSingleQue = this.questions[0].quiz.maxMarks/this.questions.length;
    //     this.marksGot += marksOfSingleQue;
    //   }
      
    //   if(q.givenAnswer.trim() != '')
    //   {
    //     this.attemptedQuestions++;
    //   }
    // });


    // console.log("Correct Answers:"+this.correctAnswers);
    // console.log("Total Marks Got:"+this.marksGot);
    // console.log("Attempted Questions:"+this.attemptedQuestions);
  }

  startTimer()
  {
    let t = window.setInterval(()=>{
      //code
      if(this.timer<=0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime()
  {
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm *60;
    return `${mm} Min : ${ss} Sec`;
  }

  printResult()
  {
    window.print();
  }

}
