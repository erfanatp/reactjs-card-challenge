import React from "react";
import {PropTypes} from "prop-types";

// Html5 audio tag component
class Audio extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <audio autoPlay>
                <source src={this.props.src} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        );
    }
}

Audio.propTypes = {
    src: PropTypes.string.isRequired
};

export default Audio;