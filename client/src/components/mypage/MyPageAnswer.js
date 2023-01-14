import UserPost from "./UserPost";

const MyPageAnswer = () => {
    return (
        <>
            <UserPost title="작성한 답변 글" content="답변 내용 예시" createdAt="2023 / 01 / 13" answerCount={false} />
        </>
    );
};

export default MyPageAnswer;
