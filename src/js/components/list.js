class List {
  constructor(value) {
    this.value = value;
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
                      <th scope="col">Cases</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr class="table-dark">
                    <td><div class="flag"></div></td>
                    <th scope="row">Saint Vincent and the Grenadines</th>
                    <td>Column content</td>
                  </tr>
                  <tr class="table-active">
                    <td><div class="flag"></div></td>
                    <th scope="row">Active</th>
                    <td>Column content</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </section>  
      </div>
    `;
  }
}

export default List;