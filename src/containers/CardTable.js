import React from "react";
import Card from "../components/Card";

class CardTable extends React.Component {

    state = {
        genre: 28,
        movieData: {
            movieId: [],
            movieImgs: []
        },
        cardData: {}
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
                    movieData: {
                        movieId: movie.id,
                        movieImgs: [...this.state.movieData.movieImgs, movie.poster_path]
                    }
                })
            }
        })
        this.setState({
            cardData: this.getCardData(this.state.movieData.movieImgs)
        })
        console.log(this.state)
    }

    getCardData = movieData => {
        let imgUrls = Array(3).join(movieData);
        let sts = Array(imgUrls.length).fill(0);
        imgUrls = this.shuffle(imgUrls);
        return {
            cards: imgUrls,
            status: sts, //init:0, turned:1, both turned and matched:2, both tuened and unmatched:3
            ready: -1, //clicked card: -1, clicked unmatched: -2
            message: "", //message for matched or not
            count: 15, //count down
            timer: null, //setInterval value
            title: "", //Congrats or game over
            run: false, //state in the game
            overlay: "overlay" //overlay class
        }
    }

    shuffle = ([...array]) => {
        for(let i = array.length -1; i >= 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    handleClick(i){
        let { cardData } = this.state.cardData;
        const sts = cardData.status.slice();
        if(cardData.status[i] !== 0){
            return;
        }
        let run = cardData.run;
        if(!run){
            return;
        }
        let ready = -1,
            message = "",
            title = "",
            overlay = "";
        if(cardData.ready === -2){
            return;
        } else if(cardData.ready === -1){
            sts[i] = 1;
            ready = i;
        } else if(cardData.ready !== i){
            sts[i] = 1;
            if(cardData.cards[cardData.ready] === cardData.cards[i]){
                message = "Matched!";
                sts[cardData.ready] = 2;
                sts[i] = 2;
                if(!this.isFinish(sts)){
                    setTimeout(() => {
                        this.cardClear();
                    }, 800);
                } else {
                    message = "";
                    run = false;
                    title = "Congratulations!"
                    overlay = "overlay overlay-end";
                    clearInterval(cardData.timer);
                }
            } else {
                message = "Unmatched!";
                ready = -2;
                sts[cardData.ready] = 3;
                sts[i] = 3;
                const rollbacksts = cardData.status.slice();
                rollbacksts[cardData.ready] = 0;
                rollbacksts[i] = 0;
                setTimeout(() => {
                    this.cardClear();
                    this.cardReset(rollbacksts);
                }, 800);
            }
        }
        this.setState({
            cardData: {
                ...this.state.cardData,
                status: sts,
                ready: ready,
                message: message,
                run: run,
                title: title,
                overlay: overlay
            }
        });
    }

    gameStart = () => {
        if(this.state.cardData.run){
            return;
        }
        this.setState({cardData: this.getCardData()});
        const timer = setInterval(() => this.countDown(), 1000);
        this.setState({
            cardData: {
                ...this.state.cardData,
                timer: timer,
                run: true,
                overlay: ""
            }
        });
    }

    cardReset = sts => {
        this.setState({
            cardData: {
               ...this.state.cardData,
               status: sts,
               ready: -1
            }
        });
    }

    cardClear = () => {
        this.setState({
            cardData: {
                ...this.state.cardData,
                message: ""
            }
        });
    }

    isFinish = sts => {
        let flg = true;
        for(let i = 0; i < sts.length; i++){
            if(sts[i] !== 2){
                flg = false;
                break;
            }
        }
        return flg;
    }

    countDown = () => {
        let nextCount = this.state.cardData.count-1;
        if(nextCount < 1){
            this.setState({
                cardData: {
                    ...this.state.cardData,
                    message: "",
                    count: 0,
                    run: false,
                    title: "Game Over",
                    overlay: "overlay overlay-end"
                }
            });
        } else {
            this.setState({
                cardData: {
                    ...this.state.cardData,
                    count: nextCount
                }
            });
        }
    }

    renderCard(i) {
        return(
            <Card key={i} 
                number={this.state.cardData.cards[i]}
                ready={this.state.cardData.status[i]}
                onClick={() => {this.handleClick(i)}}
            />
        );
    }

    render(){
        const cards = [];
        for(let i = 0; i < 10; i++){
            cards.push(this.renderCard(i));
        }
        return(
            <div>
                <button className="start-button" onClick={this.gameStart}>Start</button>
                <div className="count-number">Remaining Time: {this.state.cardData.count}s</div>
                <div className="table">
                    {cards}
                </div>
                <div className="status">{this.state.cardData.message}</div>
                <div className={this.state.cardData.overlay}><p className="title">{this.state.cardData.title}</p></div>
            </div>
        );
    }
}

export default CardTable;