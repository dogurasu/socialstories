import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleStory } from "../actions/storyActions";
import Container from "../components/Container";

const StoryScreen = ({history, location}) => {
    const dispatch = useDispatch();
    const story = useSelector(state => state.storyDetails.story);
    const [storyStr, setStoryStr] = useState('');
    const [storyBlocks, setStoryBlocks] = useState([]);
    
    // get story details on initial render
    useEffect(() => {
        try {
            const split = location.pathname.split("/");
            if (split && split.length >= 2) {
                dispatch(getSingleStory(split[2]));
            } else {
                throw Error(`pathname not long enough: ${split}`)
            }
        } catch(err) {
            console.log(`Error: ${err}`);
        }
    }, [dispatch, location])

    useEffect(() => {
        setStoryStr(story.story);
    }, [story])

    // build story string by splitting along newlines
    useEffect(() => {
        if (storyStr) {
            const splitText = storyStr.split("\n")
            const formattedParagraphs = splitText.map((txt, index) => {
                return (
                    <div key={index}>
                        <br></br>
                        <p>{txt}</p>
                    </div>
                )
            })
            setStoryBlocks(formattedParagraphs);
        }
    }, [storyStr])

    return (
        <Container>
            <div className="story">
                <div className="meta">
                    <h2 className="meta__title font-large">{story.title}</h2>
                    <div className="meta__details">
                        <div className="author__img meta__details__img" style={{backgroundImage: `url('${story.authorImage}')`}}></div>
                        <p className="meta__details__author font-small">{story.authorName}</p>
                        <p className="font-small">|</p>
                        <p className="meta__details__date font-small">{(new Date(story.createdAt)).toLocaleDateString()}</p>
                    </div>
                </div>
                <img alt="1m4g3 for article" src={`${story.image}`} className="story__img"></img>
                <div className="story__txt">
                    {storyBlocks ? storyBlocks : null}
                </div>
            </div>
        </Container>
    )
};

export default StoryScreen;