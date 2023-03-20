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

function DisplayInfo() {
  
  const { word } = useParams(); // get word from search request
  const navigate = useNavigate(); // navigate using back arrow 

  return (
    <div>
        <Link to={`/search/${word}`}>Dictionary</Link>
        <Link to={`/search/${word}/thesaurus`}>Thesaurus</Link>
    </div>
  )
}

export default DisplayInfo;