import React from "react";
import {PropTypes} from "prop-types";
import Image from "./Image";
import Audio from "./Audio";
import CardForm from "./CardForm";

// Template component to manage card view(theme) and some functionality for it's features
class Template extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            card: Object.assign({}, props.card),
            editing: false,
            bodyClass: "",
            titleIcon: ""
        };

        this.showEdit = this.showEdit.bind(this);
        this.hideEdit = this.hideEdit.bind(this);
        this.updateCardsState = this.updateCardsState.bind(this);
    }

    componentDidUpdate(prevProps) {
        // set template for each cards
        if (this.props.card.title !== prevProps.card.title) {
            this.setState({
                bodyClass: " " + this.props.template
            });

            // set title icon
            switch (this.props.template){
                case "sport":
                    this.setState({
                        titleIcon: "futbol"
                    });
                    break;
                case "art":
                    this.setState({
                        titleIcon: "images"
                    });
                    break;
                case "fun":
                default:
                    this.setState({
                        titleIcon: "smile-wink"
                    });
            }
        }
    }

    // update card's title and description in editing form
    updateCardsState(event){
        const field = event.target.name;
        let card = this.props.card;
        card[field] = event.target.value;
        return this.setState({ card: card });
    }

    // handle click on 'edit' button for each cards
    showEdit() {
        this.setState({ editing: true });
    }

    // handle 'submit' button in editing form
    hideEdit() {
        this.setState({ editing: false });
    }

    render() {
        return (
            <div className={"col col-md-4 card " + (this.props.isSpinner?"spinner":"") + this.state.bodyClass}>
                <div className="card-body">
                    {(this.state.editing?
                        <CardForm card={this.props.card} onChange={this.updateCardsState} onSubmit={this.hideEdit}/>
                    :
                        <div>
                            <h5 className="card-title"><i className={"fa fa-"+this.state.titleIcon}></i> {this.props.card.title}</h5>
                            <p className="card-text">{this.props.card.description}</p>
                            {(this.props.card.code === 0)?<Image src={this.props.card.image}
                                                        alt={this.props.card.description + " image"}/>:""}
                            {(this.props.card.code === 2)?<Audio src={this.props.card.sound}/>:""}
                            <button className="btn btn-secondary btn-sm fa fa-edit" onClick={this.showEdit}></button>
                        </div>
                )}
                </div>
            </div>
        );
    }
}

Template.propTypes = {
    card: PropTypes.object.isRequired,
    template: PropTypes.string.isRequired,
    isSpinner: PropTypes.bool.isRequired
};

export default Template;