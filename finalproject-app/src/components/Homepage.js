import axios from "axios";
import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../styles.scss";
import Form from "react-bootstrap/Form";
import { BsSearch, BsWindowSidebar } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Bookmarks from "./Bookmarks";
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import moment from 'moment';

//import moment from "moment";

function Homepage({ recentBookmarks }) {
  {/*useState for word input field rendering*/ }
  const [word, setWord] = useState("");
  const [wordOfDay, setWordOfDay] = useState("");
  const [button, setButton] = useState("");
  const [wdDef, setwdDef] = useState([]);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");


  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    // prevents from refreshing screen

    // error checking for word input 
    // i.e.) check if word exists and has no spaces  
    const trimmedWord = word.trim().toLowerCase();
    if ((trimmedWord.split(' ').length > 1)) { return (
      alert("No spaces allowed")

    ); }
    else if (!trimmedWord) {
      return (
        alert("You must enter a word")
  
      ); 
    }
    navigate(`/search/${trimmedWord}`); // push the value to defintions comp

  }

  const onSynonyms = (event) => { // for synonyms search
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || (trimmedWord.split(' ').length > 1)) return;
    navigate(`/synonyms/${trimmedWord}`);
  }

  // display recent bookmarks (i.e. last 3)
  const jsonText = JSON.parse(recentBookmarks);
  const jsonArray = Object.keys(jsonText).slice(-3);

  {/* Word Generator Component */ }
  function getDate() {
    var currentDay = moment().format("MMM Do YYYY");
    setDate(currentDay);
    var nextDay = moment().add(1, 'days').format("MMM Do YYYY");

    // set date to current date 
    localStorage.setItem("cDate", currentDay);
    setDate(localStorage.getItem("cDate"));
    console.log(localStorage.getItem("cDate"));
  }

  useEffect(()=> {
      updatedFetchCall()
    }, [button]); 


  const toggleButton = () => {
    var toggle = !button;
     setButton(toggle);
  }

  function displayWordOfDay() {
    var output = "";
    if (error.status == 404) {
      output = "Sorry, no definition found.";
      return (
        <div> 
          <div className="subtitle" Style="font-size:1.3em;">
            Unknown
          </div>
          <div Style="color:#949396; font-size:1.1em">{output}</div>
        </div>
      )
    } else if (error === "Failed to load resource: the server responded with a status of 404 ()")  {
        console.log("error caught") 
    } else {
      return (
        <div>
          <div className="subtitle" Style="font-size:1.3em;">
          <Link Style="text-decoration:none; color:#b19fe8;" to={`/search/${wordOfDay}`}>
            {wordOfDay === undefined ? "Unknown" : wordOfDay}
          </Link>
          </div>
          {wdDef.map((def, idx) => 
            <Fragment key={idx}>
                {def.meanings.map(meaning =>
                  <div>
                    <Container Style="color: #949396; align-items: center; background-color: white;" key={Math.random()}>
                      <div class="partSpeech">{meaning.partOfSpeech}</div>
                      <div>{meaning.definitions.map((definition,idx) => 
                          <div key={definition.definition}>
                              {meaning.definitions.length > 1 && `${idx +1}. `}
                              {definition.definition}
                          </div>
                        )}
                        </div>
                    </Container>
                  </div>
                )}
            </Fragment>
          )}       
        </div>
      )
    }
  }
var post;
  function updatedFetchCall() {
    fetch('https://random-word-form.herokuapp.com/random/noun').then(function 
    (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
      }).then(function (data) {
        // store the data in variable 
        post = data;
        setWordOfDay(data);
        return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data}`);
    }).then(function (response){
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }).then(function (useData) {
      setwdDef(useData);
      console.log(wordOfDay, wdDef);
    }).catch(function (error) {
      console.warn(error.status);
      setError(error.status);
    })
  }


  return (
    <div>
      <img src="/assets/bookIcon.png" />
      {/* Title */}
      <h1 className="mb-3" Style="color:white"> Word Finder </h1>

      {/* Textbox Form*/}
      <Stack direction="horizontal" gap={0}>
        <Button variant="secondary shadow-sm" aria-pressed="false" type="submit" onClick={handleSubmit} ><BsSearch /></Button>
        <Form Style="width:100%" onSubmit={handleSubmit}>
          <Form.Control className="input me-auto shadow" placeholder="Type your word here..." value={word} onChange={event => setWord(event.target.value)} />
        </Form>
        {handleSubmit}

      </Stack>

      {/* Box Container*/}
      <Stack direction="vertical" gap={2} Style="height: vh;">
        <section className=" border p-4 mt-4 h-50 font-weight-bolder shadow">

          {/******* Word of Day Comp ********/}
          {/* Map out array of elements */}
          <h2 Style="pb-1 subtitle">Word of Day</h2>
          <div>
            {displayWordOfDay()}
          </div>
                    
          <div Style="display: flex; justify-content: space-between">
            <div></div>
            <Button className="customButton mt-1" Style="font-size:1.2em; background-color:#9078D6;" onClick={() => {toggleButton()}}>Generate Word</Button>
          </div>
        </section>
        {/* Bookmarks */}
        <section className="border p-4 mt-4 mb- h-50 font-weight-bold font-weight-bolder shadow ">
          <h2>Recent Bookmarks</h2>

          {/* Map out array of elements */}
          {jsonArray.map(word =>
            <Link Style="text-decoration:none; color:#b19fe8;" to={`/search/${word}`}>
              <Container>
                  <h5 class="bookmarks" Style="text-transform: capitalize; margin-bottom:0.4em;font-size:1.3em; font-weight:600">{word}</h5>
              </Container>
            </Link>
          )}
          <div Style="display: flex; justify-content: space-between">
            <div></div>
            <Link to="/bookmarks">
              <Button className="customButton mt-1" Style="font-size:1.2em; background-color:#9078D6;">View All</Button>
            </Link>
          </div>
        </section>
      </Stack>
    </div>
  )
}


export default Homepage;