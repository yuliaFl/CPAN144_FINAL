import { useState, useEffect } from 'react';

function App() {
  return (
    <div>
      <Dictionary/>
      <Variants/>
    </div>
  );
}

function Dictionary() {
  const [word, Word] = useState({});
  const [definition, Definition] = useState({});

  useEffect(() => {
    // api key 
    fetch("").then(x => x.json()).then(json => {
      word(json.t);
      Definition(json.t[0]);
    });
  }, []);
  return (<div>

    {Object.keys(word).map((key) => (<div> {key} : {word[key]} </div>))}
    {Object.keys(description).map((key) => (<div>{key} : {description[key]}</div>))}

  </div>
  )
}
function Variants(){
const[variant, setVariant]= useState({});
const[sound, setSound]=useState({});
useEffect (() =>
fetch ("").then(x => x.json()).then(json =>{
setVariant(json.vrs.va);
setSound(json.hwi.sound);

}));
}

export default App;
