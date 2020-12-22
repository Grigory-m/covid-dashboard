import Layout from './layout';
import List from './list';
import Data from '../api/data';
import Header from './header';
import Table from "./table";
import Graph from "./graph";

class Covid {
  constructor(options) {
    this.data = [];
    this.options = options;
  }

  init = () => {
    const layout = new Layout();
    const header = new Header();
    const list = new List();  
    const table = new Table();
            
    header.createHeader();
    layout.createLayout();
    const input = document.querySelector('input');
        
    this.getData().then(() => {
      list.createListContent(this.data, this.options);
      table.createTableContent(this.data, this.options);
    });
    document.addEventListener('click', this.clickHandler); 
    input.addEventListener('input', this.inputHandler);
    input.focus();    
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
    const key = event.target.closest('.keyboard__key');
    const list = new List();
    const table = new Table();

    if (index || key) {
      if (index === 'Confirmed' || index === 'Deaths' || index === 'Recovered') {
        this.options.cases = index;
      }          
      if (index === 'All') this.options.value = 'all';
      if (index === 'Per100k') this.options.value = 'per 100k';
      if (index === 'all-time') this.options.period = 'all time';
      if (index === 'last-day') this.options.period = 'last day';
      list.createListContent(this.data, this.options, input.value);
      table.createTableContent(this.data, this.options, input.value);
    }       
  }

  inputHandler = (event) => {    
    const {value} = event.target;
    const list = new List();
    const table = new Table();
    list.createListContent(this.data, this.options, value);
    table.createTableContent(this.data, this.options, value);
  }
}

export default Covid;