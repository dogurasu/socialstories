// import {useEffect} from "react";

const Container = (props) => {
    let {additionalClass} = props;
    return (
        <div className={`container ${additionalClass}`}>
            {props.children}
        </div>
    )
}

export default Container;