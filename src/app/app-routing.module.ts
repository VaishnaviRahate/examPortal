import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewCategoryQuizzesComponent } from './pages/admin/view-category-quizzes/view-category-quizzes.component';
import { ViewQuizQuestionsComponent } from './pages/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartQuizComponent } from './pages/user/start-quiz/start-quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuardGuard } from './services/admin-guard.guard';
import { NormalGuard } from './services/normal.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuardGuard],
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },
      {
        path:'add-category',
        component: AddCategoryComponent,
      },
      {
        path:'category/:cid',
        component:UpdateCategoryComponent,
      },
      {
        path:'quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path:'view-category-quizzes/:cid/:title',
        component: ViewCategoryQuizzesComponent,
      },
      {
        path:'add-quiz',
        component: AddQuizComponent,
      },
      {
        path:'quiz/:qid',
        component:UpdateQuizComponent,
      },
      {
        path:'view-questions/:qid/:title',
        component:ViewQuizQuestionsComponent,
      },
      {
        path:'add-question/:qid/:title',
        component: AddQuestionComponent
      },
      {
        path:'question/:quesId',
        component:UpdateQuestionComponent,
      },
      
    ]
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path:':cid',
        component:LoadQuizComponent,
      },
      {
        path:'instructions/:qid',
        component:InstructionsComponent,
      },
      
    ]
  },
  {
    path:'start-quiz/:qid',
    component: StartQuizComponent,
    canActivate: [NormalGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
