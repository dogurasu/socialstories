import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import StoryCard from "../components/StoryCard";
import { listAllStories } from "../actions/storyActions.js";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const stories = useSelector(state => state.stories);
    const [storyList, setStoryList] = useState([]);

    // fetch all stories and their users
    useEffect(() => {
        console.log("dispatch useEffect");
        dispatch(listAllStories());
    }, [dispatch])
    
    // fetch stories' users once stories are done fetching
    useEffect(() => {
        // check if stories are fetched
        if (stories && stories.loading === false) {
            // if they are, build a card components array
            // storyCards = stories.storyList.map(story => <StoryCard />);
            // console.log(stories.storyList);
            // console.log(storyCards);
            const {authorName} = stories.storyList[0];
            console.log(authorName);
            setStoryList(stories.storyList);
        }
    }, [stories])
    
    // log the state
    useEffect(() => {
        console.log("every render useEffect");
        console.log(stories);
    })

    return (
        <Container>
            <div className="main">
                <h2 className="font-large margin-vertical">Popular Now</h2>
                <div className="cards">
                    {storyList && stories.loading === false 
                        ? storyList.map((story) => {
                            console.log(story);
                            return <StoryCard {...story}/>
                        })
                        : null
                    }
                </div>
            </div>
        </Container>
    )
}

export default HomeScreen;