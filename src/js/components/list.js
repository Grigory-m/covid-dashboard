class List {
  
  createListContent = (data, options) => {
    this.createListMarkup();
    const list = document.querySelector('.table > tbody');
    const typeOfCases = document.querySelector('.type-case');
    let dataCovid = data;

    list.innerHTML = '';
    typeOfCases.innerText = `${options.cases}`;
    
    if (!data.Countries) {
      dataCovid = JSON.parse(localStorage.getItem('data'));
    }
    const value = options.total ? `Total${  options.cases}` : `New${  options.cases}`;
    const abs = options.abs ? 1 : 100000;

    dataCovid.Countries.sort((a, b) => b[value] - a[value]).forEach((country) => {
      const listPosition = document.createElement('tr');
      const img = new Image();

      listPosition.classList.add('table-dark');      
      img.src = `https://www.countryflags.io/${country.CountryCode.toLowerCase()}/flat/64.png`;
        listPosition.innerHTML = `
        <td><div class="flag"><img src="${img.src}" alt="flag"></div></td>
        <th scope="row">${country.Country}</th>
        <td>${Math.round(country[value] / abs)}</td>
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