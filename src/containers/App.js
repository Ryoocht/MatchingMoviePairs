import { Component  } from "react";
import CardList from "../components/CardList";

class App extends Component {
    state = {
        genre: 28,
        movies: []
    }

    fetchMoviePics(){
        const page = Math.floor(Math.random()*501)
        let genre = this.state.genre;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8afb33342826c0533464840a6694a7df&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&without_genres=${genre}&with_watch_monetization_types=flatrate`)
        .then(resp => resp.json())
        .then(movies => {
            this.setState({
                movies: movies.results
            })
        })
    }

    componentDidMount(){
        this.fetchMoviePics();
    }
    
    render(){
        return(
            <div>
                <CardList movies={this.state.movies} />
            </div>
        )
    }
}

export default App;