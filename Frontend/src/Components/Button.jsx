const Button = (props) => {
    return (
        <button type="button" onClick={props.onClick} className="">
            {props.text}
        </button>
    );
};

export default Button;
