import axios from "axios";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Bookmarks from "./components/Bookmarks.js";
import Homepage from './components/Homepage.js';
import Dictionary from './components/Dictionary.js';
import Thesaurus from './components/Thesaurus.js'; // for synonyms 
import Container from 'react-bootstrap/Container';
import './styles.scss';
import {useState, useEffect} from 'react';
import DisplayInfo from './components/DisplayInfo';

function App() {

  // store bookmark state in the state as an array
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || '' );
  // useEffect to update local storage every time we bookmark or change a bookmark
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // add bookmark to bookmarks, update state by passing definitions from 'Definitions.js comp'
  // store old state using oldBookmarks and update value
  const addBookmark = (word, definitions) => setBookmarks(oldBookmarks => ({...oldBookmarks, [word] : definitions
  }));

  // change the state of the bookmark and delete it from storage
  const removeBookmark = word => setBookmarks(oldBookmarks => {
    // create a copy of the new state
    const temp = {...oldBookmarks};
    delete temp[word]; // remove the key with the value from the object
    return temp; // gets passed as the new state
  })

  return (
    <div>
      <Container className='text-center p-4 mt-4'>
      <Container className="xs-12 sm-8 md-5 lg-3 m-12 .container-lg mt-2" Style="width: 70%;">
      <Routes>
          <Route path='/' element={<Homepage recentBookmarks={JSON.stringify(bookmarks)}/>}/>
           <Route path='/bookmarks' element={<Bookmarks bookmarks={bookmarks} />} />
            <Route path='/search/:word' element={<Dictionary bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark}/>}/>
            <Route path='/search/:word/thesaurus' element={<Thesaurus />} /> 
        </Routes>
        </Container>
      </Container>
    </div>
  );
}

export default App;