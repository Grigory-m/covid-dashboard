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
    
    header.createHeader();
    layout.createLayout();
        
    this.getData()
      .then(() => {   
        const list = new List();     
        list.createListContent(this.data, this.options);
      })
    document.addEventListener('click', this.clickHandler);      
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
    const {target} = event;
    const dataSet = target.dataset;
    const list = new List();
    
    if (dataSet.case) this.options.cases = dataSet.case;          
    if (dataSet.population === 'All') this.options.abs = true;
    if (dataSet.population === 'Per100k') this.options.abs = false;
    if (dataSet.time === 'all-time') this.options.total = true;
    if (dataSet.time === 'last-day') this.options.total = false;
    list.createListContent(this.data, this.options);
  }
}

export default Covid;