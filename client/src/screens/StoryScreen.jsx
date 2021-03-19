import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSingleStory } from "../actions/storyActions";

const StoryScreen = ({history, location}) => {
    console.log(history);
    console.log(location);
    const dispatch = useDispatch();

    // get story details on initial render
    useEffect(() => {
        const split = location.pathname.split("/");
        console.log(split);
        // dispatch(getSingleStory(ID))
    }, [])

    return (
        <div>StoryScreen</div>
    )
};

export default StoryScreen;