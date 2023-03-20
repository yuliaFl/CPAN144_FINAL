import { useState, useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { BsSearch } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs"
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Dictionary=({bookmarks,addBookmark, removeBookmark}) => {
  const { word } = useParams(); // get word from search request
  const navigate = useNavigate(); // navigate using back arrow 
  const [definitions, setDefintions] = useState([]); // display data 
  const [exist, setExist] = useState(true) // check if word exists in dictionary
  const [audio, setAudio] = useState(null);

  // boolean to store if definition is bookmarked to avoid duplicates
  const isBookmarked = Object.keys(bookmarks).includes(word);

  // bookmarks 

  console.log(definitions);
  // called every time value we are observing the values - on load

  const updateState = data => {
          setDefintions(data);
          // set phonetics value
          const phonetics = data[0].phonetics;
          if(!phonetics.length) return; // if no audio exists, no return value
          var url = phonetics[0].audio.replace('//ssl', 'https://ssl');
         
          // if audio not found in first element
          if (phonetics[0].audio.length === 0) {
            url = phonetics[1].audio;
         }
  
          setAudio(new Audio(url));
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        updateState(resp.data);

      } catch(err) {
        setExist(false);
        console.log(err);
      }
    }

    if (!isBookmarked) fetchDefinition()
    else updateState(bookmarks[word])

  }, []);


  // check if exists state contains a word in the dicitonary 
   if(!exist) {
    return (
      <div direction="horizontal" Style="align-items: center;color: white; height:100vh; padding-top:50%;">
      <h2 Style="color: #9078D6;"> Word Not Found</h2> 
      <Button className="customButton mt-2" Style="font-size:1em; background-color:#9078D6" onClick={() => {navigate('../')}}>
        Go Back
      </Button>
    </div>
    )
   }

     // while fetching word, show loading icon
   if (!definitions.length) { return (
        <div direction="horizontal" Style="align-items: center;color: white; height:100vh; padding-top:70%;">
          <Spinner animation="border"/>
          
        </div>
   )
 
  }

  return (
    <div>
      <DisplayInfo/>

        <Stack className="justify-content-between pb-3" direction="horizontal">
          <Button className="customButton" Style="font-size:2.5em" ><BsArrowLeftShort onClick={() => {navigate('../')}}/></Button>


          <Button className="btn customButton" onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)}>
            { isBookmarked ? <BsFillBookmarkFill className="customButtonBookmark"/> :
            <BsFillBookmarkFill className="customButton"/>
            }
          </Button> 
  
        </Stack>
        <Stack className="customCard justify-content-between border p-4 h-50 font-weight-bolder shadow" direction="horizontal" Style="align-items: center; background-color: white">
              <h2 Style="color: #9078D6;"> { word }</h2> 
              {audio && <Button className="btn customButton " Style="background-color:#9078D6; width: 2em; height:2em;" >
                  <BsPlayFill onClick={() => {
                    if (audio) {
                      audio.play();
                    } else {
                        console.log("no audio");
                    }}}/>
              </Button>}
          </Stack>

         {/* Map out array of elements */}
          {definitions.map((def, idx) => 
            <Fragment key={idx}>  
              <hr className="mt-3 mb-3" Style="color:#9078D6; display: idx === 0 ? 'none' : 'block'"/>
              {def.meanings.map(meaning => 
                  <Container key={Math.random()} className="customCard justify-content-between border p-4 mt-4 h-50 font-weight-bolder shadow" Style="color: #949396; align-items: center; background-color: white;">
                        <div className="pb-1 subtitle">{meaning.partOfSpeech}</div>
                        <div>{meaning.definitions.map((definition,idx) => 
                          <div key={definition.definition}>
                              {meaning.definitions.length > 1 && `${idx +1}. `}
                              {definition.definition}
                          </div>
                        )}
                        </div>
                  </Container>
                )}
            </Fragment>
            )}
    </div>
  );
}

function DisplayInfo() {
  const { word } = useParams(); // get word from search request
  const navigate = useNavigate(); // navigate using back arrow 

  return (
     <div>
 <Button className="customButton2 mt-1" Style="   border-radius: 20px 0px 0px 20px;
font-size:1.2em;" onClick={() => {navigate(`/search/${word}`)}}>Dictionary</Button>
      <Button className="customButton2 mt-1 " Style="font-size:1.2em; background-color:#8562f0; border-radius: 0px 20px 20px 0px"  onClick={() => {navigate(`/search/${word}/thesaurus`)}}>Thesaurus</Button>  
    </div>
  )
}

export default Dictionary;
//comment
