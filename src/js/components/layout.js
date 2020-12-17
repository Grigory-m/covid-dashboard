class Layout {

  createLayout = () => {
    const wrapper = document.createElement('div');
    const tabContent = document.createElement('div');

    wrapper.classList.add('wrapper');
    tabContent.classList.add('tab-content');
    tabContent.id = 'myTabContent';
    document.body.append(wrapper);
    wrapper.append(tabContent);
  }

}

export default Layout;