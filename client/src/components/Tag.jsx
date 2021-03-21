import { useState } from "react";
import remove_circle from "../static/img/remove_circle.svg";

const Tag = ({id, deleteTag}) => {
    // console.log(props);
    // console.log(id);
    const [tag, setTag] = useState('')

    return (
        <div className="tag">
            <input 
                className="tag__input font-small"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Add Tag"
            />
            <img
                className="tag__img"
                src={remove_circle}
                onClick={(e) => {
                    console.log("deleteTag clicked ", id);
                    deleteTag(id)
                }}
            ></img>
        </div>

    )
};

export default Tag;