import { Component } from "react";
import Card from "../components/Card";

class CardTable extends Component {

    state = {
        genre: 28,
        movieImgs: [],
        initialCards: [],
        matchStatus: Array(20).fill(0),
        cardStatus: -1,
        message: '',
        count: 100,
        timer: null,
        title:  '',
        run:    false,
        overlay: 'overlay',
        record: {
            attempts: 0,
            clicks: 0,
            corrects: 0,
            time: "",
            accuracy: 0
        }
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
        return imgUrls.map(url => url)
    }

    shuffle = ([...array]) => {
        for(let i = array.length -1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    checkMatch = (value, id) => {
        let matchStatus = this.state.matchStatus.slice();
        let { corrects } = this.state.record;
        if(this.state.matchStatus[id] !== 0){
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
            matchStatus[id] = 1;
            cardStatus = id;
        } else if(this.state.cardStatus !== id){
            matchStatus[id] = 1;
            if(this.state.initialCards[this.state.cardStatus] === value){
                message = "Matched!";
                matchStatus[this.state.cardStatus] = 2;
                matchStatus[id] = 2;
                corrects += 2;
                if(!this.isFinish(matchStatus)){
                    setTimeout(() => {
                        this.cardClear();
                    }, 1000);
                } else {
                    message = "";
                    run = false;
                    title = "Congratulations!";
                    overlay = "overlay overlay-end";
                    clearInterval(this.state.timer);
                }
            } else {
                message = "Unmatched!";
                cardStatus = -2;
                matchStatus[this.state.cardStatus] = 3;
                matchStatus[id] = 3;
                const rollbacksts = this.state.matchStatus.slice();
                rollbacksts[this.state.cardStatus] = 0;
                rollbacksts[id] = 0;
                setTimeout(() => {
                    this.cardClear();
                    this.cardReset(rollbacksts);
                }, 1000);
            }
        }
        this.addRecord(corrects);
        this.setState({
            matchStatus: matchStatus,
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

    cardReset = (matchStatus) => {
        this.setState({
            matchStatus: matchStatus,
            cardStatus: -1
        });
    }

    cardClear = () => {
        this.setState({
            message: ""
        })
    }

    isFinish = (matchStatus) => {
        let flag = true;
        for (let i = 0; i < matchStatus.length; i++) {
            if(matchStatus[i] !== 2){
                flag = false;
                break;
            }
        }
        return flag;
    }

    countDown = () => {
        let nextCount = this.state.count - 1;
        if(nextCount < 1){
            this.setState({
                message: "",
                count: 0,
                run: false,
                title: "Game Over",
                overlay: "overlay overlay-end"
            });
            clearInterval(this.state.timer);
        } else {
            this.setState({
                count: nextCount
            });
        }
    }

    addRecord = corrects => {
        const { clicks } = this.state.record;
        const numberOfClicks = clicks + 1;
        const attempts = Math.floor(numberOfClicks / 2);
        const revealedCards = Math.ceil((20 - (20 - corrects)) / 2);
        const accuracy = Math.floor(revealedCards ? (revealedCards / attempts) * 100 : 0);
        this.setState({
            record: {
                clicks: numberOfClicks,
                attempts,
                corrects,
                accuracy
            }
        });
    }

    renderCards = (cards, matchStatus) => {
        return this.state.movieImgs.length === this.state.initialCards.length
        ?
        cards.map((card, index) => {
            return(
                <Card 
                    key={index}
                    value={card}
                    id={index}
                    matchStatus={matchStatus[index]}
                    checkMatch={this.checkMatch}
                />
            );
        })
        : <h1>Loading</h1>
    }

    render(){
        const { gamesPlayed, attempts: attempt, accuracy } = this.state.record;
        return(
            <div>
                <button className="start-button" onClick={this.gameStart}>Game Start</button>
                <div className="count-number">Time: {this.state.count}</div>
                <div className="status">{this.state.message}</div>
                <div id="gameStatus">
                    <span className="stat">Attempts: {attempt}</span>
                    <span className="stat">Accuracy: {accuracy}%</span>
                </div>
                <div className="table">
                    {this.renderCards(this.state.initialCards, this.state.matchStatus)}
                    <div className={this.state.overlay}><p className="title">{this.state.title}</p></div>
                </div>
            </div>
        )
    }
}

export default CardTable;