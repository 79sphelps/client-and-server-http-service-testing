import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { UserComponent } from './user/user.component';

export const AppRoutes: Routes = [
    { path: '', component: UserComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);