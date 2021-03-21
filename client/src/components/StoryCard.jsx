import { useEffect } from "react";
import { Link } from "react-router-dom";

const StoryCard = ({authorName, authorImage, comments, createdAt, image, story, tags, title, updatedAt, userID, _id, editHandler, deleteHandler}) => {
    // fetch user for this story
    // we don't need redux for this
    useEffect(() => {
        // console.log(`${title} StoryCard rendered`);
    }, [])
    const date = new Date(createdAt);
    return (
        <div className="card">
            <img alt="food" src={image} className="card__img"></img>
            <div className="card__description">
                <h3 className="card__title">{title}</h3>
                <p className="card__preview">{story.slice(0, 100)}... <Link to={`/stories/${_id}`} className="card__preview__more">READ MORE</Link></p>
                <div className="author">
                    <div className="author__img" style={{backgroundImage: `url('${authorImage}')`}}></div>
                    <div className="author__text">
                        <p className="author__name font-small">{authorName}</p>
                        <p className="author__date font-small">{date.toLocaleDateString()}</p>
                    </div>
                </div>
                {editHandler && (
                    <div className="edit__btns">
                        <Link 
                            to={{
                                pathname: "/story/edit",
                                story: {
                                    user: "doug P"
                                }
                            }}
                            className="btn btn--publish font-small" 
                            style={{marginTop: "2rem"}} 
                            onClick={editHandler}
                        >
                            Edit
                        </Link>
                        {/* <button className="btn" onClick={deleteHandler}>Delete</button> */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoryCard;