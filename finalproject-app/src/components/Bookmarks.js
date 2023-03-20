import { useState, useEffect, Fragment } from 'react';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { BsSearch } from "react-icons/bs";
import { BsArrowLeftShort } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import "../styles.scss";
import { Link } from 'react-router-dom';

const Bookmarks = ({ bookmarks }) => {
  return (
    <div>
        <Stack className=" pb-2 justify-content-between b" direction="horizontal">
        <Link to="/">
          <Button className="btn customButton" Style="font-size:2em">
            <BsArrowLeftShort/>
          </Button>
        </Link>
      </Stack>
      <h2 className="pt-3" Style="color: white; font-weight:900">Bookmarks</h2>

      {
        !!Object.keys(bookmarks).length ? // check if bookmarks exist
          Object.keys(bookmarks).map(b => 
            <Link Style="text-decoration:none" to={`/search/${b}`}>
            <Container key={b} className="customCard justify-content-between border mt-4 p-4 h-50 font-weight-bolder shadow" direction="horizontal" Style="align-items: center; background-color: white; text-transform: capitalize; font-size: 1.2em; font-weight:900; color: #9078D6;">
            {b}
            </Container>
          </Link>)
          : <h3 Style="margin-top: 1.4em; font-size: 1.4em; font-weight:900; color: #9078D6; align:center">No bookmarks found</h3>

      }
    </div>
  );
}

export default Bookmarks;