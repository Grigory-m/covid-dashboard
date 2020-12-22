export default class Table {
  createTableContent = (data, options, inputValue) => {    
    const tableContainer = document.querySelector('.tables table > tbody');
    const population = options.value === 'abs' ? 1 : 100000;
    const confirmedCases = options.period === 'all time' ? 'TotalConfirmed' : 'NewConfirmed';
    const deathsCases = options.period === 'all time' ? 'TotalDeaths' : 'NewDeaths';
    const recoveredCases = options.period === 'all time' ? 'TotalRecovered' : 'NewRecovered';
    let dataCovid = data.Countries;
    let dataCovidFiltered;
    
    tableContainer.innerHTML = '';
    
    if (!data.Countries) {
      dataCovid = JSON.parse(localStorage.getItem('data'));
    }

    if (inputValue) {
      dataCovidFiltered = dataCovid.filter(((elem) => {
        const inputValueLength = inputValue.length;
        return elem.Country.slice(0, inputValueLength).toLowerCase() === inputValue.toLowerCase();
      }))
      dataCovid = dataCovidFiltered;
    }
    
    dataCovid.sort((a, b) => b[confirmedCases] - a[confirmedCases]).forEach((country) => {
      const listPosition = document.createElement('tr');
      const th = document.createElement('th');
      const tdConfirmed = document.createElement('td');
      const tdDeaths = document.createElement('td');
      const tdRecovered = document.createElement('td');

      listPosition.classList.add('table-dark');
      th.scope = 'row';
      th.textContent = country.Country;
      tdConfirmed.textContent = Math.round(country[confirmedCases] / population);
      tdDeaths.textContent = Math.round(country[deathsCases] / population);
      tdRecovered.textContent = Math.round(country[recoveredCases] / population);
      listPosition.append(th, tdConfirmed, tdDeaths, tdRecovered);
      tableContainer.append(listPosition);
    })
  }

  createTable = () => {
    const tabContent = document.getElementById('myTabContent');
    const table = document.createElement('div');
    table.classList.add('tab-table', 'tab-pane', 'fade');
    table.id = 'table';

    table.innerHTML = `
      <section class="tables container">
          <div class="card text-white bg-primary mb-3">
            <div class="card-header">Table</div>
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                <tr>
                  <th scope="col">Location</th>
                  <th scope="col">Confirmed</th>
                  <th scope="col">Deaths</th>
                  <th scope="col">Recovered</th>
                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
      </section>
    `;
    
    tabContent.append(table);
  }
}
