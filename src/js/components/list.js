class List {
  
  createListContent = (data, options, inputValue) => {
    const list = document.querySelector('.table > tbody');
    const typeOfCases = document.querySelector('.type-case');
    const period = options.period === 'all time' ? `Total${  options.cases}` : `New${  options.cases}`;
    const absolute = options.value === 'abs' ? 1 : 100000;
    let dataCovid = data.Countries;
    let dataCovidFiltered;

    list.innerHTML = '';
    typeOfCases.innerText = `${options.cases} / ${options.period} / ${options.value}`;
    
    if (!data.Countries) {      
      dataCovid = JSON.parse(localStorage.getItem('data')).Countries;
    }
    if (inputValue) {
      dataCovidFiltered = dataCovid.filter(((elem) => {
        const inputValueLength = inputValue.length;
        return elem.Country.slice(0, inputValueLength).toLowerCase() === inputValue.toLowerCase();
      }))
      dataCovid = dataCovidFiltered;
    }
    dataCovid.sort((a, b) => b[period] - a[period]).forEach((country) => {
      const listPosition = document.createElement('tr');
      const img = new Image();

      listPosition.classList.add('table-dark');      
      listPosition.setAttribute('data-list', '');
      img.src = `https://www.countryflags.io/${country.CountryCode.toLowerCase()}/flat/64.png`;
        listPosition.innerHTML = `
        <td><div class="flag"><img src="${img.src}" alt="flag"></div></td>
        <th scope="row">${country.Country}</th>
        <td>${Math.round(country[period] / absolute)}</td>
        `;
        list.append(listPosition);             
    })       
  }

  createList = () => {
    const tabContent = document.getElementById('myTabContent');
    const list = document.createElement('div');
    list.classList.add('tab-list', 'tab-pane', 'fade', 'active', 'show');
    list.id = 'list';

    list.innerHTML = `
      <section class="list container">
        <div class="card text-white bg-primary mb-3">
          <div class="card-header">List</div>
          <div class="card-body">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col" colspan="2">Country</th>
                  <th class="type-case" scope="col">Cases</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </section>  
    `;
    tabContent.append(list);
  }
}

export default List;