import Table from "./table";
import Graph from "./graph";
import List from "./list";

export default class Map {
    
  createMapContent = (data, options, countries, value, selectedCountry) => {
    const {map} = Map.prototype;
    const table = new Table();
    const graph = new Graph();
    const list = new List();
    const input = document.querySelector('input');
    const period = options.period === 'all time' ? `Total${  options.cases}` : `New${  options.cases}`;
    const absolute = options.value === 'abs' ? 1 : 100000;
    const index = `${options.cases} / ${options.period} / ${options.value}`;
    const {L} = window;
    let dataCovid = data.Countries;
    let dataCovidFiltered;
    let color;
    const newCircles = [];
    
    if (!dataCovid) {      
      dataCovid = JSON.parse(localStorage.getItem('data')).Countries;
    }
    if (Map.prototype.circles) {      
      Map.prototype.circles.forEach((circle) => circle.remove());
    }
    if (selectedCountry) {
      dataCovid = dataCovid.filter((element) => element.Country === selectedCountry);
      const countryData = countries.find((element) => dataCovid[0].CountryCode === element.alpha2Code);
      Map.prototype.map.setView(countryData.latlng, 3);
    }
    if (value) {
      dataCovidFiltered = dataCovid.filter(((elem) => {
        const inputValueLength = value.length;
        return elem.Country.slice(0, inputValueLength).toLowerCase() === value.toLowerCase();
      }))
      dataCovid = dataCovidFiltered;
    }
    if (!dataCovid[0]) return;
    const maxValue = dataCovid.sort((a, b) => b[period] - a[period])[0][period];
    dataCovid.forEach((country) => {
      const countryData = countries.find((element) => country.CountryCode === element.alpha2Code);
      if (countryData) {
        const radius = selectedCountry ? 20 : (5 + 40 * (((country[period] / absolute) / maxValue)));
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
        const circle = L.circleMarker(coords, {
          stroke: false,
          fillColor: color,
          fillOpacity: 0.9,
          radius,
        }).addTo(map)
          .bindTooltip(`${country.Country}: ${index} ${Math.round(country[period] / absolute)}`, {className: 'tooltip'});
        circle.on('mousemove', () => {
          circle.openTooltip();
        });
        circle.on('mouseout', () => {
          circle.closeTooltip();
        });
        circle.on('click', () => {
          Map.prototype.country = country.Country;
          table.createTableContent(data, options, input.value, country.Country);
          graph.createGraphContent(data, options, input.value, country.Country);
          list.createListContent(data, options, input.value, country.Country);
        });          
        newCircles.push(circle);
      }
    })
    Map.prototype.circles = newCircles;    
  }

  createMap = () => {
    const map = document.createElement('div');
    const tabContent = document.getElementById('myTabContent');
    const {L} = window;
    
    map.classList.add('tab-map', 'tab-pane', 'fade', 'active', 'show');
    map.id = 'map';
    map.innerHTML = `
      <section class="map container">
        <div class="card text-white bg-primary mb-3">
            <div class="card-header">
              <span>Map</span>
              <div class="fullscreen-btn"></div>
            </div>
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
      const div = L.DomUtil.create('div', 'legend');
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>confirmed</span></div>`;
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>deaths</span></div>`;
      div.innerHTML += `<div class="legend-item"><span class="legend-circle"></span><span>recovered</span></div>`;          
      return div;
    };
    newMap.setMaxBounds([[-90, -180], [90, 180]]);
    legend.addTo(newMap);
    Map.prototype.map = newMap;
  }  
}