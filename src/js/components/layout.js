import tabNames from '../../data/tab_names.json';

class Layout {

  createLayout = () => {
    const wrapper = document.createElement('div');
    const tabContent = document.createElement('div');
    const tabNavigation = document.createElement('ul');

    wrapper.classList.add('wrapper');
    tabContent.classList.add('tab-content');
    tabContent.id = 'myTabContent';
    tabNavigation.classList.add('nav', 'nav-tabs');
    
    document.body.append(wrapper);
    wrapper.append(tabNavigation);
    wrapper.append(tabContent);

    tabNames.forEach((tabName) => {
      const li = document.createElement('li');
      const a = document.createElement('a');

      li.classList.add('nav-item');
      a.classList.add('nav-link');
      if (tabName === 'list') a.classList.add('active');
      a.dataset.toggle = 'tab';
      a.href = `#${tabName.toLowerCase()}`;
      a.textContent = tabName;

      li.append(a);
      tabNavigation.append(li);
    });
  }

}

export default Layout;
