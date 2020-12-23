import Chart from 'chart.js';

export default class Graph {
  createGraphContent = (data, options, inputValue) => {
    const graphContainer = document.querySelector('.graph-content');
    this.canvas = document.createElement('canvas');
    this.canvas.height = '100%';
    this.canvas.width = '100%';
    this.chart = null;
    this.title = 'world';
    const population = options.value === 'abs' ? 1 : 100000;
    let dataCovid = data.Countries;
    let dataCovidFiltered;
    this.xLabelsData = [];
    this.yCasesData = [];
    this.worldApiUrl = 'https://corona-api.com/timeline';
    this.countryApiUrl = 'https://api.covid19api.com/total/dayone/country/';
    
    graphContainer.innerHTML = '';

    if (!data.Countries) {
      dataCovid = JSON.parse(localStorage.getItem('data'));
    }

    if (inputValue) {
      dataCovidFiltered = dataCovid.filter(((elem) => {
        const inputValueLength = inputValue.length;
        return elem.Country.slice(0, inputValueLength).toLowerCase() === inputValue.toLowerCase();
      }))
      dataCovid = dataCovidFiltered;
    };
    
    if (!inputValue) {
      this.getWorldDataByDates().then((apiData) => {
        apiData.forEach((dataByDay) => {
          const cases = dataByDay[options.cases.toLowerCase()];
          const values = Math.round(cases / population);

          this.yCasesData.push(values);
          this.xLabelsData.push(dataByDay.date);
        });
        this.yCasesData.reverse();
        this.xLabelsData.reverse();
        
        this.fillChart(options.cases);
      })
    } else {
      this.getCountryDataByDates(dataCovid[0].Slug)
        .then((apiData) => {
          apiData.forEach((dataByDay) => {
            const cases = dataByDay[options.cases];
            const values = Math.round(cases / population);
            this.title = dataByDay.Country;

            this.yCasesData.push(values);
            this.xLabelsData.push(dataByDay.Date.substring(0, 10));
          });
          this.fillChart(options.cases);
        })
    }

    graphContainer.append(this.canvas);
  }

  fillChart(casesType) {
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.title.display = true;
    Chart.defaults.global.title.text = this.title.toUpperCase();
    Chart.defaults.global.defaultFontColor = '#FFFFFF';
    Chart.defaults.scale.ticks.beginAtZero = true;

    this.chart = new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: this.xLabelsData,
        datasets: [{
          label: casesType,
          data: this.yCasesData,
          backgroundColor: 'rgba(255, 230, 150, 1)',
          pointStyle: 'line',
          pointHitRadius: '2'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            }
          }],
        },
      }
    });
  }

  async getCountryDataByDates(country) {
    try {
      const response = await fetch(this.countryApiUrl + country);
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error('Не удалось получить данные для графика по стране!')
    }
  }

  async getWorldDataByDates() {
    try {
      const response = await fetch(this.worldApiUrl);
      const data = await response.json();
      return data.data;
    } catch (err) {
      throw new Error('Не удалось получить данные для графика по миру!')
    }
  }

  createGraph = () => {
    const tabContent = document.getElementById('myTabContent');
    const graph = document.createElement('div');
    graph.classList.add('tab-graph', 'tab-pane', 'fade');
    graph.id = 'graph';

    graph.innerHTML = `
      <section class="graph container">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">Graph</div>
            <div class="card-body">
              <div class="graph-content">
              </div>
            </div>
          </div>
      </section>
    `;

    tabContent.append(graph);
  }
}
