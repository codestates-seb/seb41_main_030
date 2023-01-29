import UserPost from "./UserPost";
import { useState, useEffect, memo } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

const MyPagePosts = ({ userData }) => {
    const navigate = useNavigate();

    // Server Data
    const [postListData, setPostListData] = useState(undefined);
    const url = "http://ec2-43-201-14-234.ap-northeast-2.compute.amazonaws.com:8080";

    useEffect(() => {
        axios
            .get(`${url}/boards/all`)
            .then((res) => {
                setPostListData(res.data);
            })
            .catch((error) => console.log(error.response));
    }, []);

    const userPostData = postListData && userData && postListData.filter((postData) => postData.nickName === userData.nickName);

    // Infinite Scroll
    /* const [target, setTarget] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemLists, setItemLists] = useState([]);

    // let userPostData;

    let firstPosts, secondPosts, thirdPosts;
    if (userPostData) {
        firstPosts = userPostData.slice(0, 10);
        secondPosts = userPostData.slice(10, 20);
        thirdPosts = userPostData.slice(20, 30);
    }

    // useEffect(() => {
    //     if (itemLists) {
    //         console.log(itemLists);
    //         // console.log(userPostData);
    //     }
    // }, [itemLists]);

    const getMoreItem = async () => {
        // 로딩 컴포넌트 보여줌
        setIsLoaded(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));
        let items = Array(10).fill(0); // [0.0,0,0,0,0,]
        // setItemLists((itemLists) => itemLists.concat(items))

        // console.log(postListData); -> undefined
        userPostData = postListData && postListData.filter((postData) => postData.memberId === memberId);

        if (itemLists.length === 0) {
            firstPosts && setItemLists((prev) => prev.concat(firstPosts));
            setIsLoaded(false);
            // console.log("test");
        } else if (itemLists.length === 10 && secondPosts) {
            userPostData && setItemLists((prev) => prev.concat(secondPosts));
            setIsLoaded(false);
            return itemLists;
        } else if (itemLists.length === 20 && thirdPosts) {
            userPostData && setItemLists((prev) => prev.concat(thirdPosts));
            setIsLoaded(false);
            return itemLists;
        }
        // userPostData && setItemLists((itemLists) => itemLists.concat(userPostData));

        // 로딩 컴포넌트 숨김
        setIsLoaded(false);
    };

    const onIntersect = async ([entry], observer) => {
        if (entry.isIntersecting && !isLoaded) {
            // 관찰 종료 메소드
            observer.unobserve(entry.target);

            // isLoaded === true
            // setItemsLists(userPostData)
            await getMoreItem();

            // 관찰 시작 메소드
            observer.observe(entry.target);
        }
    };

    useEffect(() => {
        // intersection Observer를 담을 observer 변수 선언
        let observer;

        // ref 역할을 하는 target이라는 state가 존재한다면
        if (target) {
            // intersection Observer 생성해서 observer 변수에 담음
            // new IntersectionObserver (callback(entries, observer), options);
            observer = new IntersectionObserver(onIntersect, {
                // 타겟 엘리먼트가 교차영역에 진입했을 때,
                // 교차영역에 타겟 엘리먼트의 100%가 보여지면 observe가 반응
                // 콜백함수 onIntersect를 호출
                threshold: 1.0,
            });
            // observer가 관찰할 대상(target)을 observer.observe 함수로 지정
            observer.observe(target);
        }
        // 다중 타겟요소들의 옵저빙을 동시에 멈추기 위해 사용되는 메서드
        // target 요소가 바뀐다면(유저가 스크롤을 내려 새로운 아이템을 받아오면) Target State가 바뀌고
        // 관찰 요소를 없애고 새로 지정함
        return () => observer && observer.disconnect();
    }, [target]);*/

    return (
        <>
            {userPostData && userPostData.length === 0 ? (
                <Alert>
                    작성하신 게시글이 없습니다.
                    <br />
                    MENTALTAL 커뮤니티에 고민을 작성해보세요!
                    <button onClick={() => navigate("/write")}>고민 작성하러 가기</button>
                </Alert>
            ) : (
                userPostData &&
                userPostData.map((post, index) => {
                    return <UserPost key={index} title={post.title} content={post.content} createdAt={post.createdAt} isComment={true} commentCount={post.commentCount} boardId={post.boardId} />;
                })
            )}
            {/* <div ref={setTarget} />
            {isLoaded && <Loader />} */}
        </>
    );
};

export default memo(MyPagePosts);

const Alert = styled.div`
    font-size: 120%;
    font-weight: var(--font-bold);
    color: var(--green);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 6%;
    line-height: 160%;
    text-align: center;
    flex-direction: column;
    @media screen and (max-width: 648px) {
        font-size: 105%;
    }
    @media screen and (max-width: 376px) {
        font-size: 97%;
    }

    button {
        font-family: "Nanum Gothic", sans-serif;
        font-size: 90%;
        font-weight: var(--font-bold);
        margin-top: 33px;
        padding: 12px;
        width: 300px;
        border-radius: 50px;
        @media screen and (max-width: 648px) {
            padding: 10px;
            width: 280px;
            font-size: 85%;
        }
    }
`;
