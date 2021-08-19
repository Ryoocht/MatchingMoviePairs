import { Component } from "react";
import Card from "../components/Card";

class CardTable extends Component {

    state = {
        genre: 28,
        movieImgs: [],
        initialCards: [],
        cardStatus: -1,
        message: '',
        count: 100,
        timer: null,
        title:'',
        run:false,
        overlay: 'overlay'
    }

    fetchMoviePics = async() => {
        const page = Math.floor(Math.random() * 501);
        const resp = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8afb33342826c0533464840a6694a7df&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&without_genres=${this.state.genre}&with_watch_monetization_types=flatrate`)
        const data = await resp.json();
        return data.results;
    }

    async componentDidMount() {
        const movies = await this.fetchMoviePics();
        movies.map(movie => {
            if (movie.poster_path !== null) {
                this.setState({
                    movieImgs: [...this.state.movieImgs, movie.poster_path]
                })
            }
        })
        this.setState({
            initialCards: this.combinedUrls(this.state.movieImgs)
        })
    }

    combinedUrls = movieImgs => {
        let slicedUrls = movieImgs.slice(0, 10);
        let imgUrls = (slicedUrls + "," + slicedUrls).split(",");
        imgUrls = this.shuffle(imgUrls);
        return imgUrls.map(url => [
            {value: url, matchStatus: 0}
        ])
    }

    shuffle = ([...array]) => {
        for(let i = array.length -1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    checkMatch = (value, id) => {
        const sts = this.state.initialCards.map(data => data[0].matchStatus);
        if(this.state.initialCards[id][0].matchStatus !== 0){
            return;
        }
        let run = this.state.run;
        if(!run){
            return
        }
        let cardStatus = -1,
            message = "",
            title = "",
            overlay = "";
        if(this.state.cardStatus === -2){
            return;
        } else if(this.state.cardStatus === -1){
            sts[id] = 1;
            cardStatus = id;
        } else if(this.state.cardStatus !== id){
            sts[id] = 1;
            if(this.state.initialCards[this.state.cardStatus][0].value === value){
                message = "Matched!";
                sts[this.state.cardStatus] = 2;
                sts[id] = 2;
                if(!this.isFinish(sts)){
                    setTimeout(() => {
                        this.cardClear();
                    }, 800);
                } else {
                    message = "";
                    run = false;
                    title = "Congratulations!";
                    overlay = "overlay overlay-end";
                }
            } else {
                message = "Unmatched!";
                cardStatus = -2;
                sts[this.state.cardStatus] = 3;
                sts[id] = 3;
                const rollbacksts = this.state.initialCards.map(data => data[0].matchStatus);
                rollbacksts[this.state.cardStatus] = 0;
                rollbacksts[id] = 0;
                setTimeout(() => {
                    this.cardClear();
                    this.cardReset(rollbacksts);
                }, 800);
            }
        } 
        this.setState({
            matchStatus: sts,
            cardStatus: cardStatus,
            message: message,
            run: run,
            title: title,
            overlay: overlay
        });
    }

    gameStart = () => {
        if(this.state.run){
            return;
        }
        const timer = setInterval(() => this.countDown(), 1000);
        this.setState({
            timer: timer,
            run: true,
            overlay: ""
        });
    }

    cardReset = (sts) => {
        this.setState({
            matchStatus: sts,
            cardStatus: -1
        });
    }

    cardClear = () => {
        this.setState({
            message: ""
        })
    }

    isFinish = (sts) => {
        let flag = true;
        for (const index of sts) {
            if(sts[index] !== 2){
                flag = false;
                break;
            }
        }
        return flag;
    }

    countDown = () => {
        let nextCount = this.state.count - 1;
        if(nextCount < 1){
            this.state({
                message: "",
                count: 0,
                run: false,
                titl: "Game Over",
                overlay: "overlay overlay-end"
            });
            clearInterval(this.state.timer);
        } else {
            this.setState({
                count: nextCount
            });
        }
    }

    renderCards = cards => {
        return this.state.movieImgs.length === this.state.initialCards.length
        ?
        cards.map((card, index) => {
            return(
                <Card 
                    key={index}
                    value={card[0].value}
                    id={index}
                    matchStatus={card[0].matchStatus}
                    checkMatch={this.checkMatch}
                />
            );
        })
        : <h1>Loading</h1>
    }

    render(){
        return(
            <div>
                <button className="start-button" onClick={this.gameStart}>Game Start</button>
                <div className="count-number">Time: {this.state.count}</div>
                <div className="status">{this.state.message}</div>
                <div className="table">
                    {this.renderCards(this.state.initialCards)}
                    <div className={this.state.overlay}><p className="title">{this.state.title}</p></div>
                </div>
                
                
            </div>
        )
    }
}

export default CardTable;