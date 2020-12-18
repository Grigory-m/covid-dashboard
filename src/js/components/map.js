export default class Map {

  createMarker = async (map, country) => {    
    const response = await fetch(`https://api.covid19api.com/country/${country}/status/confirmed`);
    const data = await response.json();
    const coords = [+data[0].Lat, +data[0].Lon];
    const circle = L.circle(coords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100000
    }).addTo(map);
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
   
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      maxZoom: 18,
      minZoom: 2,
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoiZ3JpZ29yeS1tIiwiYSI6ImNrYWR2Y2E2dTAybGEyeHRlcnh3NHJ2ajMifQ.xUrZR7nK5AmTgh9rfjwT3w'
    }).addTo(newMap);
    return newMap;
  }  
}