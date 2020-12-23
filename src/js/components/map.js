import Table from "./table";
export default class Map {
    
  createMapContent = (data, options, countries) => {
    const map = Map.prototype.map;
    const table = new Table();
    const input = document.querySelector('input');
    const period = options.period === 'all time' ? `Total${  options.cases}` : `New${  options.cases}`;
    const absolute = options.value === 'abs' ? 1 : 100000;
    const index = `${options.cases} / ${options.period} / ${options.value}`;
    let dataCovid = data.Countries;
    let color;
    let newCircles = [];
    
    if (!dataCovid) {      
      dataCovid = JSON.parse(localStorage.getItem('data')).Countries;
    }
    if (Map.prototype.circles) {      
      Map.prototype.circles.forEach((circle) => circle.remove());
    }
    
    dataCovid.forEach((country) => {
      const countryData = countries.find((element) => country.CountryCode === element.alpha2Code);
      if (countryData) {
        const radius = 100000 + 1000000 * ((country[period] / absolute) / countryData.population);
        const coords = countryData.latlng;
        switch (options.cases) {
          case 'Deaths':
            color = '#f39c12';
            break;
          case 'Recovered':
            color = '#2dee34'
            break;
          default:
            color = '#e74c3c'
            break;
        }        
        const circle = L.circle(coords, {
          stroke: false,
          fillColor: color,
          fillOpacity: 1,
          radius: radius,
        }).addTo(map)
          .bindTooltip(`${country.Country}: ${index} ${Math.round(country[period] / absolute)}`, {className: 'tooltip'});
        circle.on('mousemove', () => {
          circle.openTooltip();
        });
        circle.on('mouseout', () => {
          circle.closeTooltip();
        });
        circle.on('click', () => {
          table.createTableContent(data, options, input.value, country.Country);
        });          
        newCircles.push(circle);
      }
    })
    Map.prototype.circles = newCircles;    
  }

  createMap = () => {
    const map = document.createElement('div');
    const tabContent = document.getElementById('myTabContent');
    
    map.classList.add('tab-map', 'tab-pane', 'fade');
    map.id = 'map';
    map.innerHTML = `
      <section class="map container">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header">Map</div>
          <div class="card-body">
            <div id="map-content" class="map-content"></div>
          </div>
        </div>
      </section>
    `;
    tabContent.append(map);   
    const newMap = L.map('map-content').setView([51.505, -0.09], 3);
    const legend = L.control({position: 'bottomright'});

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      minZoom: 2,
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ3JpZ29yeS1tIiwiYSI6ImNrYWR2Y2E2dTAybGEyeHRlcnh3NHJ2ajMifQ.xUrZR7nK5AmTgh9rfjwT3w'
    }).addTo(newMap);
    legend.onAdd = () => {
      let div = L.DomUtil.create('div', 'legend');
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>confirmed</span></div>`;
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>deaths</span></div>`;
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>recovered</span></div>`;          
      return div;
    };
    legend.addTo(newMap);
    Map.prototype.map = newMap;
  }  
}