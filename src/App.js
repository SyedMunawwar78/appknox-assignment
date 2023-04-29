import React from 'react';
import Autocomplete from './AutoComplete';
import data from "./MOCK_DATA.json"


const App = () => {
  return (
    <div>
      <div className='center'>
      <Autocomplete data={data} />
      </div>
    </div>
  );
};

export default App;
