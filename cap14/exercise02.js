/*
  Elements by tag name

  The document.getElementsByTagName method returns all child elements with a given tag name.
  Implement your own version of this as a function that takes a node and a string
  (the tag name) as arguments and returns an array containing all descendant element
  nodes with the given tag name.

  To find the tag name of an element, use its nodeName property. But note that this will
  return the tag name in all uppercase. Use the toLowerCase or toUpperCase string
  methods to compensate for this.

========================================================================================== */

const byTagName = (node, tagName) => {  
  const byTagNameNext = (node, tagName, result) => {
    for (let child of Array.from(node.children)) {
      if (child.nodeName == tagName.toUpperCase()) {
        result.push(child);
      }

      byTagNameNext(child, tagName, result);
    }

    return result;
  };

  return byTagNameNext(node, tagName, []);
};

console.log(byTagName(document.body, "h1").length); // → 1
console.log(byTagName(document.body, "span").length); // → 3

let para = document.querySelector("p");
console.log(byTagName(para, "span").length); // → 2