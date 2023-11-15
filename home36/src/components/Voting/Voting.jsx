import {Component} from 'react'
import SmileCard from '../SmileCard'

import './Voting.scss';

export default class Voting extends Component {
    state = {
        candidates: [],
        votes: {},
        showResults: false,
    }

    findWinner = () => {
        const { votes, candidates } = this.state;

        const maxVotes = Math.max(...Object.values(votes));

        const winners = Object.keys(votes).filter(candidateId => votes[candidateId] === maxVotes);

        const winnersInfo = winners.map(winnerId => {
            return candidates.find(candidate => candidate.id === parseInt(winnerId));
        });

        return winnersInfo;
    };


    handleVote = (id) => {
        this.setState((prevState) => {
            const currentVotes = prevState.votes[id] || 0;
            return {
                votes: {
                    ...prevState.votes,
                    [id]: currentVotes + 1,
                }
            };
        });
    }


    handleShowResults = () => {
        this.setState({
            showResults: true,
        });
    };


    componentDidMount() {
        fetch('http://localhost:3000/data.json')
            .then(res => res.json())
            .then(result => {
                const ids = result.map(item => item.id);

                const initialVotes = ids.reduce((acc, id) => {
                    return {...acc, [id]: 0};
                }, {});

                this.setState({
                    candidates: result,
                    votes: initialVotes,
                });
            });
    }


    render() {
        return (
            <div className="Voting">
                <h1>Choose the best smile ever:</h1>
                <div className='container'>
                    {!this.state.candidates.length && <div>No candidates yet...</div>}

                    {this.state.candidates.map(item => (
                        <div key={item.id}>
                            <SmileCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                smile={item.smile}
                                onVote={this.handleVote}
                            />

                            {this.state.showResults && <div>{this.state.votes[item.id]}</div>}
                        </div>
                    ))}


                    {this.state.showResults && (
                        <div className="winner-container">
                            <p className="winner-label">Winner{this.findWinner().length > 1 ? 's' : ''}:</p>
                            {this.findWinner().length > 0 ? (
                                this.findWinner().map(winner => (
                                    <SmileCard
                                        key={winner.id}
                                        id={winner.id}
                                        title={winner.title}
                                        description={winner.description}
                                        smile={winner.smile}
                                    />
                                ))
                            ) : (
                                <p>No winner yet</p>
                            )}
                        </div>
                    )}

                    <button onClick={this.handleShowResults}>Show Results</button>

                </div>
            </div>
        )
    }
}
