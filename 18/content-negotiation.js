const types = ['text/plain', 'text/html', 'application/json', 'application/rainbows+unicorns'];
const url = 'https://eloquentjavascript.net/author';

function fetchAuthor() {
  for (let type of types) {
    fetch(url, {headers: {accept: type}})
      .then(resp => resp.text())
      .then(text => console.log(`${type}: ${text}\n`));
  }
}

fetchAuthor();
