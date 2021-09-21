import axios from 'axios';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      photoResultInfo: []
    }
  }

  getPhotos = async (e) => {
    e.preventDefault();
    await this.setState({
      searchQuery: e.target.photoQuery.value
    })

    console.log(this.state.searchQuery)
    // // localhost:3001/photos?searchQuery=book
    let photoResult = await axios.get(`${process.env.REACT_APP_SERVER_LINK}/photos?searchQuery=${this.state.searchQuery}`)

    await this.setState({
      photoResultInfo: photoResult.data
    })

    console.log(this.state.photoResultInfo)
  }

  render() {
    return (
      <>
        <form onSubmit={this.getPhotos}>
          <input type='text' name='photoQuery' />
          <button>Search</button>
        </form>

        {this.state.photoResultInfo.length &&
          <>
            <img src={this.state.photoResultInfo[0].imageUrl} alt='' width={150} />
            <p>{this.state.photoResultInfo[0].likes}</p>
          </>
        }
        <p>shihab</p>
      </>
    )
  }
}

export default App
