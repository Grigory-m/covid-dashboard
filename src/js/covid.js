import Layout from './components/layout';
import List from './components/list';
import Data from './api/data';

class Covid {

  init = () => {
    const layout = new Layout();
    const list = new List();

    layout.createLayout();    
    this.getData()
      .then(() => {        
        list.createListContent(this.data);
      })
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
}

export default Covid;