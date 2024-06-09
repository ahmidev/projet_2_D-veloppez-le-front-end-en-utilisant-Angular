import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Observable, filter, map, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import 'chartjs-plugin-piechart-outlabels';
import { ChartElement } from 'src/app/core/models/ChartElement';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[]> = of([]);
  public pieChartData: number[] = [];
  public pieChartLabels: string[] = [];
  public pieChartColors: any[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions = {
    plugins: {
      legend:false,
      outlabels: {
        text: '%l',
        color: 'black',
        backgroundColor: 'transparent',
        stretch: 50,
        font: {
          resizable: true,
          minSize: 12,
          maxSize: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any, data: any) => {
            const label = data.labels[tooltipItem.index] as string;
            const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            return `🏅 ${label}: ${value}`;
          }
        }
      }
    },
    onClick: this.onChartClick.bind(this)
  };

  public numberOfCountries: number = 0;
  public numberOfParticipations: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.pipe(
      filter(data => data !== null && data !== undefined),
      map(data => this.transformData(data))
    ).subscribe(({ labels, data, colors, numberOfCountries, numberOfParticipations }) => {
      this.pieChartLabels = labels;
      this.pieChartData = data;
      this.pieChartColors = [{ backgroundColor: colors }];
      this.numberOfCountries = numberOfCountries;
      this.numberOfParticipations = numberOfParticipations;
    });
  }

  private transformData(data: any): { labels: string[], data: number[], colors: string[], numberOfCountries: number, numberOfParticipations: number } {
    if (!data) {
      return { labels: [], data: [], colors: [], numberOfCountries: 0, numberOfParticipations: 0 };
    }

    const labels = data.map((item: any) => item.country + '🏅');
    const dataValues = data.map((item: any) =>
      item.participations.reduce((sum: number, p: any) => sum + p.medalsCount, 0)
    );
    const colors = ['#793d52', '#89a1db', '#9780a1', '#bfe0f1', '#b8cbe7', '#956065']; 

    const allParticipations = data.flatMap((item: any) => item.participations.map((p: any) => p.year));
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