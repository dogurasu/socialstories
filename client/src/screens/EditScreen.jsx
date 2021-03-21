import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import axios from "axios";
import Tag from "../components/Tag";
import Container from "../components/Container";
import { getSingleUser } from "../actions/userActions";
import { createSingleStory } from "../actions/storyActions";
import add_circle from "../static/img/add_circle.svg";
import { STORY_CREATE_RESET } from "../constants/storyConstants";

const EditScreen = (props) => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [story, setStory] = useState('');
    const [tags, setTags] = useState([]);
    const [tagCount, setTagCount] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [created, setCreated] = useState(false);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const userDetails = useSelector(state => state.userDetails)
    const createdStory = useSelector(state => state.createdStory).createdStory;
    const {history, location} = props;

    useEffect(() => {
        if (Object.keys(userDetails).length === 0) {
            dispatch(getSingleUser(userLogin.userInfo._id));
        }
    }, dispatch)
    
    useEffect(() => {
        if (createdStory && Object.keys(createdStory).length > 0) {
            console.log("in created");
            dispatch({type: STORY_CREATE_RESET});
            history.push("/profile");
        }
    }, [createdStory])

    // useEffect(() => {
    //     if (createdStory && Object.keys(createdStory).length > 0) {
    //         console.log("in createdStory check");
    //         setCreated(true);
    //     }
    // }, createdStory, history)


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        // const reader = new FileReader();
        // console.log(reader.readAsDataURL(file));
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/v1/uploads', formData, config);
            setImage(data.replace("\\\\", "/"));
            setUploading(false);
        } catch(err) {
            console.log(err);
            setUploading(false);
        }
    }

    const handleAddTag = (e) => {
        setTags([...tags, <Tag id={tagCount} key={tagCount} deleteTag={handleRemoveTag}/>]);
        setTagCount(tagCount+1);
        // console.log(tags);
    }

    const handleRemoveTag = (targetID) => {
        // console.log(targetID);
        // const newTags = tags.filter(tag => tag.id !== targetID);
        // console.log(`targetID: ${targetID}`);
        // console.log(tags);
        let newTags = [];
        for (let tag of tags) {
            if (tag.key !== targetID) {
                newTags.push(tag);
            } else {
                console.log("Not pushed");
            }
        }
        // const newTags = tags.filter(tag => {
        //     if (tag.props.id !== targetID) {
        //         console.log(`This tag is safe: ${tag.props.id}`);
        //         console.log(tag.props.id);
        //         return tag;
        //     } else {
        //         console.log(`This tag is not safe: ${tag.props.id}`)
        //         return tag;
        //     }
        // });
        setTags(newTags);
    }

    // useEffect(() => {
    //     if (!uploading && image) {
    //     }
    // }, [image]);

    const storySubmitHandler = (e) => {
        e.preventDefault();
        // console.log(userLogin);
        // console.log(userDetails);
        // console.log("HERE");
        // console.log(image.replace("\\", "/"));
        dispatch(createSingleStory({
            story,
            title,
            tags: tags.map((tag) => tag),
            image: image.replace("\\", "/"),
            userID: userLogin.userInfo._id,
            authorName: userLogin.userInfo.name,
            authorImage: userDetails.userDetails.userImage
        }, userLogin.userInfo.token));
        console.log("PUBLISHED");
    }

    return (
        <Container>
            <div className="edit">
                <h2 className="margin-vertical font-large">Edit Story</h2>
                <form action="" method="post" className="edit__form font-small" onSubmit={storySubmitHandler}>
                    <div className="cred__name edit__title">
                        <label className="font-medium margin-vertical-less" htmlFor="title">Title</label>
                        <input
                            type="text"
                            name="title" 
                            id="title" 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="cred__username">
                        <Form.Label className="font-medium margin-vertical-less" >Image</Form.Label>
                        {/* <Form.Control
                            type="text"
                            placeholder="Enter image url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control> */}
                        <Form.File id="image-file" label="Choose File" custom onChange={handleFileUpload}></Form.File>
                        {/* {!uploading && image && (
                            <img src={`/api/v1${image.replace("\\", '/')}`} />
                        )} */}
                    </div>
                    <div className="edit__story">
                        <p className="font-medium margin-vertical-less">Story (separate line breaks with newlines)</p>
                        <textarea
                            className="font-small edit__story"
                            onChange={(e) => setStory(e.target.value)}
                            value={story}
                        >
                            {story}
                        </textarea>
                    </div>
                    <div className="edit__tags">
                        <div className="edit__tags__title">
                            <label className="font-medium margin-vertical-less" htmlFor="tags">Tags</label>
                            <img
                                onClick={handleAddTag}
                                className="edit__tags__add"
                                alt="add circle"
                                src={add_circle}>
                            </img>
                        </div>
                        {tags}
                    </div>
                    <button
                        type="submit"
                        className="btn btn--publish font-small"
                    >Publish Story</button>
                </form>
            </div>
        </Container>
    )
};

export default EditScreen;