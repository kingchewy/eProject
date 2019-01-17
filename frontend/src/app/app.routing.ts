import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { ProjectsComponent } from './projects/projects.component';
import { MainComponent } from './main/main.component';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { FloorsComponent } from './floors/floors.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FloordetailsComponent } from './floordetails/floordetails.component';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { AdminComponent } from './admin/admin.component';
import { RoomConfigComponent } from './room-config/room-config.component';
import { ProjectconfigComponent } from './projectconfig/projectconfig.component';

const appRoutes: Routes = [
    /* { path: '', component: UsersComponent, canActivate: [AuthGuard] }, */
    /* { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] }, */
    { path: 'login', component: LoginComponent },
    { 
        path: 'main',
        component: MainComponent,
        canActivate: [AuthGuard],

            children: [
                //PROJECTS
            { path: "", redirectTo: "projects", pathMatch: "full" },

                //PROJECTSDETAILS
            { path: "projects/new", component: ProjectdetailsComponent }, //create new project
            { path: "projects/:id", component: ProjectdetailsComponent }, //edit existing project data
            
            { path: "projects", component: ProjectsComponent },

                // PROJECTCONFIGURATION
            { path: "projects/:id/config", component: ProjectconfigComponent },

                //FLOORS
            { path: "projects/:id/floors", component: FloorsComponent,
                children: [
                    // ROOMS
                    { path: "", component: RoomsComponent },
                ]
            },
                //FLOORDETAILS
            { path: "projects/:projectid/floors/new", component: FloordetailsComponent }, //ceate new Floor
            { path: "floors/:floorid", component: FloordetailsComponent }, // edit existing Floor data

                //ROOMDETAILS
            { path: "floors/:floorid/rooms/new", component: RoomdetailsComponent }, //create new Room
            { path: "rooms/:roomid", component: RoomdetailsComponent }, // edit existing Room

                //SHOPPINGLIST
            { path: "shoppinglist", component: ShoppinglistComponent },


                //ROOMKONFIGURATION
            { path: "config/room/:roomid", component: RoomConfigComponent },

            

                //ADMIN
            { path: "admin", component: AdminComponent },
            ]
    },


    { path: '**', redirectTo: 'main' }
];

export const routing = RouterModule.forRoot(appRoutes);