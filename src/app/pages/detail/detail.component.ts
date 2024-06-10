import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: string[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  public country: string = '';
  public numberOfEntries: number = 0;
  public totalNumberOfMedals: number = 0;
  public totalNumberOfAthletes: number = 0;

  constructor(private route: ActivatedRoute, private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.country = params['country'];
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.olympicService.getOlympics().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      const countryData = data.find((item: Olympic) => item.country === this.country);
      if (countryData) {
        this.numberOfEntries = countryData.participations.length;
        this.totalNumberOfMedals = countryData.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0);
        this.totalNumberOfAthletes = countryData.participations.reduce((sum: number, p: Participation) => sum + p.athleteCount, 0);
        this.lineChartLabels = countryData.participations.map((p: Participation) => p.year.toString());
        this.lineChartData = [{
          data: countryData.participations.map((p: Participation) => p.medalsCount),
          label: 'Medals',
          borderColor: 'blue',
          fill: false
        }];
      }else{
        this.router.navigate(['/not-found']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}