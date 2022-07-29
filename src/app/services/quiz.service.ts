import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //fetch all quizzes
  public quizzes(){
    return this.http.get(`${baseUrl}/quiz/`);
  }

  //fetch quizzes according to categories
  public getQuizzesOfCategory(cid:number)
  {
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }

  //add quiz
  public addQuiz(quiz: any)
  {
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }

  //delete quiz
  public deleteQuiz(qid : number)
  {
    return this.http.delete(`${baseUrl}/quiz/${qid}`);
  }

  // get a single quiz
  public getQuiz(qid:number)
  {
    return this.http.get(`${baseUrl}/quiz/${qid}`);
  }

  //update quiz
  public updateQuiz(quiz:any)
  {
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }
}
