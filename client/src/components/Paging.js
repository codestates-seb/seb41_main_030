import Pagination from "react-js-pagination";
import styled from "styled-components";

const PagingWrapper = styled.div`
    .pagination {
        padding: 20px 0 60px;
    }

    ul {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul > li {
        width: 35px;
        height: 35px;

        font-size: 18px;
        font-weight: 600;
        color: var(--darkgreen);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    ul > li:hover {
        color: #1a2d27;
        background-color: rgba(63, 114, 77, 0.2);
        border-radius: 10px;
        cursor: pointer;
    }
`;

const Paging = ({ current, setCurrent }) => {
    const handlePageChange = (page) => {
        setCurrent(page);
    };

    return (
        <PagingWrapper>
            <Pagination activePage={current} itemsCountPerPage={10} totalItemsCount={450} pageRangeDisplayed={5} prevPageText={"‹"} nextPageText={"›"} onChange={handlePageChange} />
        </PagingWrapper>
    );
};

export default Paging;
