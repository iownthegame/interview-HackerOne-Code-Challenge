import React, { Component } from 'react'
import './App.css';
import SearchBar from './components/SearchBar'
import Spinners from './components/Spinners'
import SearchResults from './components/SearchResults'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.searchInput = React.createRef();

    this.state = {
      data: null,
      loading: false,
      searched: false,
    }
  }

  search() {
    // console.log("Enter Button Pressed", this.searchInput.current.value)
    const query = this.searchInput.current.value
    if (!query) {
      return
    }
    this.setState({ loading: true })
    fetch(`/search/tweets?query=${query}&count=100`)
      .then(response => response.json())
      .then(res => {
        // console.log(res.result)
        this.setState({ data: res.result, loading: false, searched: true})
        // console.log(this.state)
      });
  }

  render() {
    const { loading, data, searched } = this.state
    return (
      <div className="App">
        <div className="App-content">
          <div className="App-title">My Twitter Search Engine</div>
          <SearchBar
            search={this.search.bind(this)}
            searchInput={this.searchInput}
          />
          <Spinners loading={loading} />
          <SearchResults
            data={data}
            searched={searched}
          />
        </div>
      </div>
    )
  }
}
