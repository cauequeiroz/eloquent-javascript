/*
  Tabs

  Tabbed panels are widely used in user interfaces. They allow you to select an
  interface panel by choosing from a number of tabs “sticking out” above an element.

  In this exercise you must implement a simple tabbed interface. Write a function, asTabs,
  that takes a DOM node and creates a tabbed interface showing the child elements of that node.
  It should insert a list of <button> elements at the top of the node, one for each child
  element, containing text retrieved from the data-tabname attribute of the child. All but
  one of the original children should be hidden (given a display style of none). The
  currently visible node can be selected by clicking the buttons.

  When that works, extend it to style the button for the currently selected tab
  differently so that it is obvious which tab is selected.

========================================================================================== */

const asTabs = node => {
  const items = Array.from(node.children).reverse();  
  let selected;

  for (let item of items) {
    item.style.display = 'none';

    const button = document.createElement('button');
    button.textContent = item.getAttribute('data-tabname');

    button.addEventListener('click', function() {
      if (item == selected) return;

      if (selected) {
        selected.item.style.display = 'none';
        selected.button.style.border = 'none';
      }

      item.style.display = 'block';
      button.style.border = '2px solid black';
      selected = { item, button };
    });

    node.prepend(button);    
  }

  node.querySelector('button').click();
};

asTabs(document.querySelector("tab-panel"));