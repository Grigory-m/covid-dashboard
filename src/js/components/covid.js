import Layout from './layout';
import List from './list';
import Data from '../api/data';
import Header from './header';

class Covid {
  constructor(options) {
    this.data = [];
    this.options = options;
  }

  init = () => {
    const layout = new Layout();
    const header = new Header();
    const list = new List();    
        
    header.createHeader();
    layout.createLayout();
    const input = document.querySelector('input');
        
    this.getData().then(() => list.createListContent(this.data, this.options));
    document.addEventListener('click', this.clickHandler); 
    input.addEventListener('input', this.inputHandler);     
  }

  getData = async () => {
    const countries = new Data('https://restcountries.eu/rest/v2/');
    const covid = new Data('https://api.covid19api.com/summary');
    
    this.countries = await countries.getFlagsAndPopulations();
    this.data = await covid.getGlobalCases();
    
    if (this.data.Message === '') {
      localStorage.setItem('data', JSON.stringify(this.data));
    }    
  }

  clickHandler = (event) => {
    const {index} = event.target.dataset;
    const input = document.querySelector('input');
    const list = new List();

    if (!index) return;    
    if (index === 'Confirmed' || index === 'Deaths' || index === 'Recovered') {
      this.options.cases = index;
    }          
    if (index === 'All') this.options.value = 'all';
    if (index === 'Per100k') this.options.value = 'per 100k';
    if (index === 'all-time') this.options.period = 'all time';
    if (index === 'last-day') this.options.period = 'last day';
    list.createListContent(this.data, this.options, input.value);
  }

  inputHandler = (event) => {
    
    const {value} = event.target;
    const list = new List();
    list.createListContent(this.data, this.options, value);
  }
}

export default Covid;