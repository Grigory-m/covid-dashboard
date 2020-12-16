class Header {

  createHeader = () => {
    const header = document.createElement('header');
    
    header.innerHTML = `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <button class="navbar-toggler mx-2" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarColor02">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Period</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" data-index="all-time" href="#">All time</a>
                <a class="dropdown-item" data-index="last-day" href="#">Last day</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Cases</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" data-index="Confirmed" href="#">Illness</a>
                <a class="dropdown-item" data-index="Deaths" href="#">Deaths</a>
                <a class="dropdown-item" data-index="Recovered" href="#">Recovered</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Values</a>
              <div class="dropdown-menu">
                <a class="dropdown-item" data-index="All" href="#">All cases</a>
                <a class="dropdown-item" data-index="Per100k" href="#">Per 100k population</a>
              </div>
            </li>
          </ul>      
          <form class="form-inline mx-2 my-lg-0 my-2">
            <input class="form-control mr-sm-2" type="text" placeholder="Enter country">
            <button class="btn btn-secondary my-sm-0" data-index="Enter" type="submit">Search</button>
          </form>
        </div>
      </nav>
    `;
    document.body.append(header);
  }
}

export default Header;