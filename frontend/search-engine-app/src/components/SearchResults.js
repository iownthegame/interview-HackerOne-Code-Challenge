import React, { Component } from 'react'
import { Nav, ListGroup, Card } from 'react-bootstrap'

class SearchResults extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultKey: "home"
    }
    this.resultRef = React.createRef()
  }

  onNameClick(e, userName) {
    e.stopPropagation()
    const url = `https://twitter.com/${userName}`
    window.open(url, '_blank')
  }

  onCardClick(e, userName, tweetId) {
    e.stopPropagation()
    const url = `https://twitter.com/${userName}/status/${tweetId}`
    window.open(url, '_blank')
  }

  onTagClick(e, hashtag) {
    e.stopPropagation()
    const url = `https://twitter.com/hashtag/${hashtag}`
    window.open(url, '_blank')
  }

  generateResults(results) {
    return (
      <ListGroup>
        {results.map((result, idx) => {
          return (
            <ListGroup.Item key={idx}>
                <Card bg="dark" className="hover-pointer" onClick={(e) => this.onCardClick(e, result.user.screen_name, result.id_str)}>
                  <Card.Body>
                    <div className="result-title">
                      <div>
                        <img className="card-avatar hover-pointer" src={result.user.profile_image_url} alt="user-img" onClick={(e) => this.onNameClick(e, result.user.screen_name)} />
                      </div>
                      <div>
                        <Card.Title className="card-title">
                          <div className="hover-underline" onClick={(e) => this.onNameClick(e, result.user.screen_name)}>{result.user.name}</div>
                        </Card.Title>
                        <Card.Subtitle className="card-subtitle mb-2 text-muted">
                          <span><span className="hover-underline" onClick={(e) => this.onNameClick(e, result.user.screen_name)}>@{result.user.screen_name}</span> • {result.created_at.substring(0, result.created_at.length - 14)}</span>
                        </Card.Subtitle>
                      </div>
                    </div>
                    <div className="card-text">
                      {result.text}
                      <br/>
                      <div style={{color: "white"}}>
                        {result.entities.hashtags.map((hashtag, idx) => {
                          return (
                            <span key={idx}><span className="hover-underline" onClick={(e) => this.onTagClick(e, hashtag.text)}>{`#${hashtag.text}`}</span> </span>
                          )
                        })}
                      </div>
                      <br/>
                      <div className="card-icons">
                        <div className="card-icon">
                          <div className="card-svg-wrapper">
                            <svg className="card-svg" viewBox="0 0 24 24"><g><path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path></g></svg>
                          </div>
                          <div>{result.retweet_count}</div>
                        </div>
                        <div className="card-icon">
                          <div className="card-svg-wrapper">
                            <svg className="card-svg" viewBox="0 0 24 24"><g><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path></g></svg>
                          </div>
                          <div>{result.favorite_count}</div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              {/* </a> */}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }

  generateHashtagResults(hashtags) {
    return (
      <ListGroup>
        {hashtags.map((hashtag, idx) => {
          return (
            <ListGroup.Item className="hashtag-wrapper" key={idx}>
              <a className="card-link" href={`https://twitter.com/hashtag/${hashtag[0]}`} target="_blank" rel="noopener noreferrer">
                <Card className="hashtag-content">
                  <Card.Title className="hashtag-name">
                    #{hashtag[0]}
                  </Card.Title>
                  <Card.Subtitle className="hashtag-count">
                    {hashtag[1]} times
                  </Card.Subtitle>
                </Card>
              </a>
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    )
  }

  render() {
    const props = this.props
    if (!props.searched) return null

    const data = props.data
    if (!data || data.count === 0) {
      return <div>No Results</div>
    }
    const { results, hashtags } = data
    const { resultKey } = this.state
    const handleSelect = eventKey => {
      this.setState({resultKey: eventKey})
      this.resultRef.current.scrollTop = 0
    }
    return (
      <div>
        <div>
          <Nav className="App-nav" fill variant="tabs" defaultActiveKey={resultKey} onSelect={handleSelect}>
            <Nav.Item>
              <Nav.Link eventKey="home">{`Top Results (${results.length})`}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="hashtag">{`Top Hashtags (${hashtags.length})`}</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="App-result" ref={this.resultRef}>
          {
            resultKey === 'home' ? this.generateResults(results) : this.generateHashtagResults(hashtags)
          }
        </div>
      </div>
    )
  }
}

export default SearchResults
