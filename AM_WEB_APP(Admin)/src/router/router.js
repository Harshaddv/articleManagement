import React, { useState } from 'react';

import {
  BrowserRouter,
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";

import News from '../pages/Articles';

function Router() {

  return (
    <>
      {
          <>
                <BrowserRouter>
                  <Routes>
                  <Route path="/" exact element={<News />} />
                    <Route path="/news" exact element={<News />} />
                  </Routes>
                </BrowserRouter>
          </>
      }
    </>
  );
}

export default Router;
