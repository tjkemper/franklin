import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,

  // Material (future CDK)
  OverlayModule
} from '@angular/material';

import {HttpModule} from '@angular/http';
import {CdkTableModule} from '@angular/cdk';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { AboutComponent } from './about/about.component';

import { DotPipe } from './dot.pipe';
import { SpecialDatePipe } from './special-date.pipe';

import { DeckService } from './deck.service';
import { DeckStoreService } from './deck-store.service';
import { StatsService } from './stats.service';
import { WeekStatsComponent } from './week-stats/week-stats.component';
import { TotalStatsComponent } from './total-stats/total-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    DotPipe,
    AboutComponent,
    SpecialDatePipe,
    StatsComponent,
    WeekStatsComponent,
    TotalStatsComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CdkTableModule,
    ChartsModule,

        // Material
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdCoreModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSnackBarModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    MdNativeDateModule,

    AppRoutingModule
  ],
  providers: [
    DeckService,
    DeckStoreService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
