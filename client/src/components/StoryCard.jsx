import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StoryCard = ({authorName, authorImage, comments, createdAt, image, story, tags, title, updatedAt, userID, _id}) => {
    const [user, setUser] = useState({});
    // const dispatch = useDispatch()

    // fetch user for this story
    // we don't need redux for this
    useEffect(() => {
        // console.log(`${title} StoryCard rendered`);
    }, [])

    return (
        <div className="card">
            <img alt="food" src={image} className="card__img"></img>
            <div className="card__description">
                <h3 className="card__title">{title}</h3>
                <p className="card__preview">{story.slice(0, 50)}... <Link to={`/stories/${_id}`} className="card__preview__more">READ MORE</Link></p>
                <div className="author">
                    <div className="author__img" style={{backgroundImage: `url('${authorImage}')`}}></div>
                    <div className="author__text">
                        <p className="author__name font-small">{authorName}</p>
                        <p className="author__date font-small">{createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryCard;