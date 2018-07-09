let items = "1 lemon, 2 cabbages, and 101 eggs";

const minusOne = (match, amount, item) => {
  amount = Number(amount) - 1;

  if (amount == 1) {
    item = item.slice(0, item.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }

  return amount + " " + item;
};

console.log(items.replace(/(\d+) (\w+)/g, minusOne)); // → no lemon, 1 cabbage, and 100 eggs