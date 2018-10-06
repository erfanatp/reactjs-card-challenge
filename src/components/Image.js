import React from "react";
import {PropTypes} from "prop-types";

// Html5 image element component
class Image extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <img className="card-img-top" src={this.props.src} alt={this.props.alt}/>
        );
    }
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default Image;