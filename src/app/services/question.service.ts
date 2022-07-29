import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }

  //get questions
  public getQuestionsOfQuiz(qid:number)
  {
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get a single question
  public getQuestion(quesId:number)
  {
    return this.http.get(`${baseUrl}/question/${quesId}`);
  }

  //add question
  public addQuestion(question:any)
  {
    return this.http.post(`${baseUrl}/question/`,question);
  }

  //delete question
  public deleteQuestion(questionId:number)
  {
    return this.http.delete(`${baseUrl}/question/${questionId}`);
  }

  //to get questions of quiz on user side which are allowed i.e only 20 questions/only 10 questions 
  public getQuestionsOfQuizForTest(qid:number)
  {
    return this.http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //update question
  public updateQuestion(question:any)
  {
    return this.http.put(`${baseUrl}/question/`,question);
  }

  //evaluate quiz
  public evalQuiz(questions:any)
  {
    return this.http.post(`${baseUrl}/question/eval-quiz`,questions);
  }
}
