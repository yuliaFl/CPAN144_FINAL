const wordOfTheDay = require('words-of-the-day');
 
 
wordOfTheDay.wordThink().then(data => {
  console.log(data);
});
 
wordOfTheDay.merrimWebster().then(data => {
  console.log(data);
});
 
wordOfTheDay.dictionarWord().then(data => {
  console.log(data);
});