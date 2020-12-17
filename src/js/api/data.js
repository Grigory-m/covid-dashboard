export default class {

  constructor(url) {
    this.url = url;
  }

  getFlagsAndPopulations = async () => {
    try {      
      const response = await fetch(`${this.url}all?fields=name;flag;population;`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Не удалось получить данные о стране!')
    }    
  }

  getGlobalCases = async () => {
    try {
      const response = await fetch(`${this.url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Не удалось получить данные о COVID-19!')
    }    
  }
}
