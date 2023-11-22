import React, { Component } from 'react';
import SmileCard from '../SmileCard/SmileCard';
import './Voting.scss';

class Voting extends Component {
    state = {
        candidates: [],
        votes: {},
        showResults: false,
    };

    handleVote = (id) => {
        this.setState((prevState) => {
            const currentVotes = prevState.votes[id] || 0;
            return {
                votes: {
                    ...prevState.votes,
                    [id]: currentVotes + 1,
                },
            };
        });
    };

    handleShowResults = () => {
        this.setState({
            showResults: true,
        });
    };

    componentDidMount() {
        fetch('http://localhost:3000/data.json')
            .then((res) => res.json())
            .then((result) => {
                const ids = result.map((item) => item.id);

                const initialVotes = ids.reduce((acc, id) => {
                    return { ...acc, [id]: 0 };
                }, {});

                this.setState({
                    candidates: result,
                    votes: initialVotes,
                });
            });
    }

    render() {
        const { candidates, votes, showResults } = this.state;
        const winners = this.findWinner();

        return (
            <div className="Voting">
                <h1>Choose the best smile ever:</h1>
                <div className="container">
                    {!candidates.length && <div>No candidates yet...</div>}

                    {candidates.map((item) => (
                        <div key={item.id}>
                            <SmileCard
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                smile={item.smile}
                                onVote={this.handleVote}
                                isActive={!showResults}
                            />

                            {showResults && <div>{votes[item.id]}</div>}
                        </div>
                    ))}

                    {showResults && (
                        <div className="winner-container">
                            <p className="winner-label">
                                Winner{winners.length > 1 ? 's' : ''}:
                            </p>
                            {winners.length > 0 ? (
                                winners.map((winner) => (
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

                    <button onClick={this.handleShowResults} disabled={showResults}>
                        Show Results
                    </button>
                </div>
            </div>
        );
    }

    findWinner = () => {
        const { votes, candidates } = this.state;
        const maxVotes = Math.max(...Object.values(votes));

        const winners = Object.keys(votes).filter(
            (candidateId) => votes[candidateId] === maxVotes
        );

        const winnersInfo = winners.map((winnerId) =>
            candidates.find((candidate) => candidate.id === parseInt(winnerId))
        );

        return winnersInfo;
    };
}

export default Voting;
