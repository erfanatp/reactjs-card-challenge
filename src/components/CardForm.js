import React from "react";
import {PropTypes} from "prop-types";

// component to edit card data via a form
const CardForm = ({card, onChange, onSubmit}) => {
    return(
        <form>
            <h3>Edit Card</h3>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={card.title} name="title" onChange={onChange}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description" onChange={onChange} value={card.description}></textarea>
            </div>
            <button className="btn btn-success" onClick={onSubmit}><i className="fa fa-check"></i> Submit</button>
        </form>
    );
};

CardForm.propTypes = {
    card: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default CardForm;