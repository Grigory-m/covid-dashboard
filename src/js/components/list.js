class List {
  constructor(value) {
    this.value = value;
  }

  createListContent = (data, value = 'TotalConfirmed') => {
    this.createListMarkup();
    const list = document.querySelector('.table > tbody');
    const typeOfCases = document.querySelector('.type-case');
    let dataCovid = data;
    typeOfCases.innerText = `${value.slice(5)}`;
    if (!data.Countries) {
      dataCovid = JSON.parse(localStorage.getItem('data'));
    }
    dataCovid.Countries.sort((a, b) => b[value] - a[value]).forEach((country) => {
      const listPosition = document.createElement('tr');
      const img = new Image();

      listPosition.classList.add('table-dark');      
      img.src = `https://www.countryflags.io/${country.CountryCode.toLowerCase()}/flat/64.png`;
        listPosition.innerHTML = `
        <td><div class="flag"><img src="${img.src}" alt="flag"></div></td>
        <th scope="row">${country.Country}</th>
        <td>${country[value]}</td>
        `;
        list.append(listPosition);             
    })       
  }

  createListMarkup = () => {
    const tabContent = document.getElementById('myTabContent');

    tabContent.innerHTML = `
      <div class="tab-list tab-pane fade active show" id="list-graph">
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
      </div>
    `;
  }
}

export default List;