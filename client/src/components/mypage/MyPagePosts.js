import UserPost from "./UserPost";
import { useState, useEffect } from "react";
import axios from "axios";

const MyPagePosts = ({ userData }) => {
    const [postListData, setPostListData] = useState(undefined);
    const url = `http://localhost:3001`;
    let memberId = undefined;
    if (userData) {
        memberId = userData.memberId;
    }

    useEffect(() => {
        axios.get(`${url}/boards`).then((res) => {
            setPostListData(res.data);
        });
    }, []);

    const userPostData = postListData && postListData.filter((postData) => postData.memberId === memberId);

    return (
        <>
            {postListData &&
                userPostData.map((post, index) => {
                    return <UserPost key={index} title={post.title} content={post.content} createdAt={post.createdAt} answerCount={true} />;
                })}
        </>
    );
};

export default MyPagePosts;
