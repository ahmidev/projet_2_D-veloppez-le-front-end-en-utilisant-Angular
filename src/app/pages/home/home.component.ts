import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Observable, Subject, filter, map, of, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import 'chartjs-plugin-piechart-outlabels';
import { ChartElement } from 'src/app/core/models/ChartElement';
import { Participation } from 'src/app/core/models/Participation';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  public olympics$: Observable<Olympic[]> = of([]);
  public isLoading$!: Observable<boolean>;
  public errorMessage$!: Observable<string | null>;

  public pieChartData: number[] = [];
  public pieChartLabels: string[] = [];
  public pieChartColors: Color[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,  
    aspectRatio: 1.5,
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      }
    },
    plugins: {
      legend: false,
      outlabels: {
        text: '%l',
        color: 'black',
        backgroundColor: 'transparent',
        stretch: 20,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        }
      }
    },
    onClick: this.onChartClick.bind(this)
  };

  public numberOfCountries: number = 0;
  public numberOfParticipations: number = 0;


  constructor(private olympicService: OlympicService, private router: Router) {
    this.isLoading$ = this.olympicService.getIsLoading$();
    this.errorMessage$ = this.olympicService.getErrorMessage$();
  }

  
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      filter(data => data !== null && data !== undefined),
      map(data => this.transformData(data)),
      takeUntil(this.destroy$)
    ).subscribe(({ labels, data, colors, numberOfCountries, numberOfParticipations }) => {
      this.pieChartLabels = labels;
      this.pieChartData = data;
      this.pieChartColors = [{ backgroundColor: colors }];
      this.numberOfCountries = numberOfCountries;
      this.numberOfParticipations = numberOfParticipations;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private transformData(data: Olympic[]): { labels: string[], data: number[], colors: string[], numberOfCountries: number, numberOfParticipations: number } {
    if (!data) {
      return { labels: [], data: [], colors: [], numberOfCountries: 0, numberOfParticipations: 0 };
    }

    const labels = data.map((item: Olympic) => item.country + '🏅');
    const dataValues = data.map((item: Olympic) =>
      item.participations.reduce((sum: number, p: Participation) => sum + p.medalsCount, 0)
    );
    const colors = ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']; 

    const allParticipations = data.flatMap((item: Olympic) => item.participations.map((p: Participation) => p.year));
    const uniqueParticipations = new Set(allParticipations);
    const numberOfCountries = data.length;
    const numberOfParticipations = uniqueParticipations.size;

    return { labels, data: dataValues, colors, numberOfCountries, numberOfParticipations };
  }

  onChartClick(event: MouseEvent, active: ChartElement[]): void {
    if (active.length > 0) {
      const activePoint = active[0]._index;
      const countryWithMedal = this.pieChartLabels[activePoint];
      const medalEmojiRegex = /\u{1F3C5}/u;
      const country = countryWithMedal.replace(medalEmojiRegex, "");
      this.router.navigate(['/detail', country]);
    }
  }
}