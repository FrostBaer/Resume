import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';
import { ThesisComponent } from './components/thesis/thesis.component';
import { ProfileLoaderComponent } from './components/profile/profile-loader.component';

const routes: Routes = [  
  { path: "", component: ProfileComponent },
  { path: "about", component: ProfileComponent },
  { path: "loader", component: ProfileLoaderComponent },
  { path: "resume", component: ResumeComponent },
  { path: "projects", component: ProjectsComponent },
  { path: "project/:id", component: ProjectDetailComponent },
  { path: "thesis", component: ThesisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
