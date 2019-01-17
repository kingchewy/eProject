import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';

import { AppComponent } from './app.component';
import { routing } from './app.routing';


import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthenticationService } from './_services/authentication.service';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '../../node_modules/@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TokeninterceptorService } from './_services/tokeninterceptor.service'
import { ProjectService } from './_services/project.service';
import { ProjectdetailsComponent } from './projectdetails/projectdetails.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewSwitchComponent } from './view-switch/view-switch.component';
import { FloorsComponent } from './floors/floors.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FloordetailsComponent } from './floordetails/floordetails.component';
import { FloorService } from './_services/floor.service';
import { RoomService } from './_services/room.service';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { AdminComponent } from './admin/admin.component';
import { RoomConfigComponent } from './room-config/room-config.component';
import { AppliancesComponent } from './appliances/appliances.component';
import { SensorsComponent } from './sensors/sensors.component';
import { CircuitbreakerOfAppliancePipe } from './_pipes/circuitbreaker-of-appliance.pipe';
import { SurgeprotectorOfAppliancePipe } from './_pipes/surgeprotector-of-appliance.pipe';
import { CircuitbreakerIdOfAppliancePipe } from './_pipes/circuitbreaker-id-of-appliance.pipe';
import { SurgeprotectorOfCircuitbreakerPipe } from './_pipes/surgeprotector-of-circuitbreaker.pipe';
import { AppliancedetailsComponent } from './appliancedetails/appliancedetails.component';
import { SensordetailsComponent } from './sensordetails/sensordetails.component';
import { SurgeprotectordetailsComponent } from './surgeprotectordetails/surgeprotectordetails.component';
import { CircuitbreakerdetailsComponent } from './circuitbreakerdetails/circuitbreakerdetails.component';
import { ProjectconfigComponent } from './projectconfig/projectconfig.component';
import { CircuitbreakersComponent } from './circuitbreakers/circuitbreakers.component';
import { SurgeprotectorsComponent } from './surgeprotectors/surgeprotectors.component';
import { AppliancecategoriesComponent } from './appliancecategories/appliancecategories.component';
import { SensorcategoriesComponent } from './sensorcategories/sensorcategories.component';
import { SurgeProtectorShoppingListComponent } from './surge-protector-shopping-list/surge-protector-shopping-list.component';
import { CircuitBreakerShoppingListComponent } from './circuit-breaker-shopping-list/circuit-breaker-shopping-list.component';
import { SensorShoppingListComponent } from './sensor-shopping-list/sensor-shopping-list.component';
import { ApplianceShoppingListComponent } from './appliance-shopping-list/appliance-shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ProjectsComponent,
    HeaderComponent,
    MainComponent,
    ProjectdetailsComponent,
    SpinnerComponent,
    ViewSwitchComponent,
    FloorsComponent,
    BreadcrumbComponent,
    ShoppinglistComponent,
    RoomsComponent,
    FloordetailsComponent,
    RoomdetailsComponent,
    AdminComponent,
    RoomConfigComponent,
    AppliancesComponent,
    SensorsComponent,
    CircuitbreakerOfAppliancePipe,
    SurgeprotectorOfAppliancePipe,
    CircuitbreakerIdOfAppliancePipe,
    SurgeprotectorOfCircuitbreakerPipe,
    AppliancedetailsComponent,
    SensordetailsComponent,
    SurgeprotectordetailsComponent,
    CircuitbreakerdetailsComponent,
    ProjectconfigComponent,
    CircuitbreakersComponent,
    SurgeprotectorsComponent,
    AppliancecategoriesComponent,
    SensorcategoriesComponent,
    SurgeProtectorShoppingListComponent,
    CircuitBreakerShoppingListComponent,
    SensorShoppingListComponent,
    ApplianceShoppingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    routing,
    OrderModule,
  ],
  providers: [AuthenticationService, ProjectService, FloorService, RoomService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
