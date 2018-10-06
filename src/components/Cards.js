import React from "react";
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import {bindAtionCreators} from "redux";
import {cardsFetchData} from "../actions/CardsActions";
import $ from "jquery";
import Template from "./Template";

// main component that we do many thing about this project here
class Cards extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            selectedCard: Object.assign({}, props.randomCard),
            currentIndex: ""
        };

        this.tryAnotherCard = this.tryAnotherCard.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.randomCard !== prevProps.randomCard) {
            this.setState({selectedCard: this.props.randomCard});
        }
    }

    componentDidMount() {
        // get initial card datas from server when component mount
        this.props.fetchData("http://static.pushe.co/challenge/json");
    }

    // function to handle 'Try' button to select and show another card
    tryAnotherCard() {
        $(".spinner").removeClass("spinner"); // remove animation class
        let newCard = selectRandomCard(this.props.cards);
        // prevent duplicate card
        if(newCard === this.state.selectedCard) {
            this.tryAnotherCard();
            return;
        }
        this.setState({selectedCard: newCard});
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the cards</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div>
                <div className="row justify-content-md-center" id="card-container">
                    <Template card={this.state.selectedCard}
                              template={this.state.selectedCard.tag}
                              title={this.state.selectedCard.title}
                              description={this.state.selectedCard.description}
                              image={this.state.selectedCard.image}
                              sound={this.state.selectedCard.sound}
                              code={this.state.selectedCard.code}
                              isSpinner={(this.state.selectedCard.code === 1)}/>
                </div>
                <br/>
                <div className="row justify-content-md-center">
                    <button className="col col-md-4 btn btn-primary" onClick={this.tryAnotherCard}>Try</button>
                </div>
            </div>
        );
    }
}

Cards.propTypes = {
    randomCard: PropTypes.object,
    cards: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchData: PropTypes.func.isRequired
};

// select randomly card from cards array
function selectRandomCard(cards) {
    const card = cards[ Math.floor(Math.random()*cards.length) ];
    if(card) return card;
    return null;
}

function mapStateToProps(state, ownProps) {
    let random_card = {
        tag: "",
        title: "",
        description: "",
        image: "",
        sound: "",
        code: -1
    };
    if(state.cards.length > 0) {
        random_card = selectRandomCard(state.cards);
    }
    return {
        randomCard: random_card,
        cards: state.cards,
        hasErrored: state.cardsHasErrored,
        isLoading: state.cardsIsLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: (url) => dispatch(cardsFetchData(url))
    };
}

// export default Cards;
export default connect(mapStateToProps, mapDispatchToProps)(Cards);