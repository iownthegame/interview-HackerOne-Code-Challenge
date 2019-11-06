import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

function SearchBar(props) {
  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><span role="img" aria-label="zoom">🔍</span></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder="Enter a term..."
          aria-label="term"
          aria-describedby="basic-addon1"
          type="input"
          onKeyPress={event => {
            if (event.key === "Enter") {
              props.search(event.value);
            }
          }}
          ref={props.searchInput}
          spellCheck={false}
        />
      </InputGroup>
    </div>
  )
}

export default SearchBar
