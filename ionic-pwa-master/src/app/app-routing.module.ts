import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
