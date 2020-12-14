import Layout from './components/layout';
import List from './components/list';

class Covid {

  init = () => {
    const layout = new Layout();
    const list = new List();

    layout.createLayout();
    list.createListMarkup();
  }
}

export default Covid;