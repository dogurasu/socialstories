import { Link } from "react-router-dom";

const StoryCard = ({authorName, comments, createdAt, image, story, tags, title, updatedAt, userID}) => {
    return (
        <div className="card">
            <img alt="food" src="/images/food.jpg" className="card__img"></img>
            <div className="card__description">
                <h3 className="card__title">{title}</h3>
                <p className="card__preview">{story.slice(0, 50)}... <Link to="/" className="card__preview__more">READ MORE</Link></p>
                <div className="author">
                    <div className="author__img" style={{backgroundImage: `url('${image}')`}}></div>
                    {/* <img alt="" src="/images/smiling_3.jpg" className="author__img"></img> */}
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