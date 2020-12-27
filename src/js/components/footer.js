class Footer {

  createFooterMarkup = () => {
    const footer = document.createElement('footer');
    
    footer.innerHTML = `
      <div class="github">
        <ul>
          <li><a href="https://github.com/Grigory-m">Grigory Murashko</a></li>
          <li><a href="https://github.com/Soyo265">Alyona Kotlyarova</a></li>
        </ul>
      </div>
      <div class="rs-school">
        <a href="https://rs.school/js/">
          <img src="img/rs_school_logo.svg" alt="rs school">
        </a>
      </div>
    `;
    document.body.append(footer);
  }
}

export default Footer;