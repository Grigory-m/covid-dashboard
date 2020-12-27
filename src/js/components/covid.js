import Layout from './layout';
import List from './list';
import Data from '../api/data';
import Header from "./header";
import Table from "./table";
import Map from './map';
import Graph from "./graph";
import Footer from "./footer";

class Covid {
  constructor(options) {
    this.data = [];
    this.options = options;
  }

  init = () => {
    const layout = new Layout();
    const header = new Header();
    const list = new List();
    const graph = new Graph();
    const map = new Map();   
    const table = new Table();
    const footer = new Footer();
            
    header.createHeader();
    layout.createLayout();
    list.createList();
    map.createMap();
    table.createTable();
    graph.createGraph();
    footer.createFooterMarkup();

    this.getData().then(() => {
      list.createListContent(this.data, this.options);
      map.createMapContent(this.data, this.options, this.countries);
      table.createTableContent(this.data, this.options);
      graph.createGraphContent(this.data, this.options);
    });
    const input = document.querySelector('input');
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
    const {value} = document.querySelector('input');
    const key = event.target.closest('.keyboard__key');
    const listPosition = event.target.closest('[data-list]');
    const fullscreenBtn = event.target.closest('.fullscreen-btn');
    const worldLink = event.target.closest('a[data-link="world"]');
    const list = new List();
    const map = new Map();
    const table = new Table();
    const graph = new Graph();
    const {country} = Map.prototype;
    
    if (index || key) {
      if (index === 'Confirmed' || index === 'Deaths' || index === 'Recovered') {
        this.options.cases = index;
      }          
      if (index === 'absolute') this.options.value = 'abs';
      if (index === 'Per100k') this.options.value = 'per 100k';
      if (index === 'all-time') this.options.period = 'all time';
      if (index === 'last-day') this.options.period = 'last day';
      list.createListContent(this.data, this.options, value);
      map.createMapContent(this.data, this.options, this.countries, value, country);
      table.createTableContent(this.data, this.options, value, country);
      graph.createGraphContent(this.data, this.options, value, country);
    }      
    if (listPosition) {
      const listLines = document.querySelectorAll('[data-list]');
      const listCountry = listPosition.children[1].innerText;
      Map.prototype.country = listCountry;
      listLines.forEach((line) => line.classList.remove('table-active'));
      listPosition.classList.add('table-active');
      table.createTableContent(this.data, this.options, value, listCountry);
      map.createMapContent(this.data, this.options, this.countries, value, listCountry);
      graph.createGraphContent(this.data, this.options, value, listCountry);
    } 
    if (fullscreenBtn) {
      const wrapper = document.querySelector('.wrapper');
      const thead = event.target.closest('.card-header');
      const target = thead.children[0].textContent.toLowerCase();
      if (wrapper.hasAttribute('data-fullscreen')) wrapper.removeAttribute('data-fullscreen');
      else wrapper.dataset.fullscreen = target;
    }
    if (worldLink) {
      const input = document.querySelector('input');
      input.value = '';
      Map.prototype.country = '';
      list.createListContent(this.data, this.options, input.value);
      table.createTableContent(this.data, this.options, input.value);
      graph.createGraphContent(this.data, this.options, input.value);
      map.createMapContent(this.data, this.options, this.countries);
    }
  }

  inputHandler = (event) => {    
    const {value} = event.target;
    const list = new List();
    const graph = new Graph();
    const table = new Table();
    const map = new Map();
    list.createListContent(this.data, this.options, value);
    table.createTableContent(this.data, this.options, value);
    graph.createGraphContent(this.data, this.options, value);
    map.createMapContent(this.data, this.options, this.countries, value);
  }
}

export default Covid;