/*  
  The Document Object Model

-------------------------------------------- */

// basic elements
// ---
document; // #document

document.documentElement; // <html>
document.head; // <head>
document.body; // <body>

document.body.nodeType; // will return one of the follow types
Node.ELEMENT_NODE; // 1
Node.TEXT_NODE; // 3
Node.COMMENT_NODE; // 8


// navigate through the DOM
// ---
document.body.childNodes;
document.body.parentNode;
document.body.firstChild;
document.body.lastChild;
document.body.previousSibling;
document.body.nextSibling;
document.body.children; // only ELEMENT_NODE children


// searching
// ---
document.getElementsByTagName('tag');
document.getElementsByClassName('class name');
document.getElementById('id');
document.querySelectorAll('selector');
document.querySelector('selector');


// editing
// ---
document.body.remove(); 
document.body.appendChild(node);
document.body.insertBefore(newNode, referenceNode);
document.body.replaceChild(newNode, oldNode);


// creating
// ---
document.createTextNode('content');
document.createElement('element name (img)');

document.body.setAttribute('attr name', 'attr content');
document.body.getAttribute('attr name');


// layout
// ---
document.body.offsetWidth; // width of element
document.body.offsetHeight; // height of element
document.body.getBoundingClientRect(); // full info about position and size
window.pageXOffset; // x pos of scroll
window.pageYOffset; // y pos of scroll


