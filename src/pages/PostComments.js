import React, { useState } from 'react';
import { Grid, Header, Container, Placeholder, Divider, Pagination, Dropdown } from 'semantic-ui-react';

var faker = require('faker');

const sortOptions = [
  {
    key: 'Most Recent',
    text: 'Most Recent',
    value: 'Most Recent'
  },

  {
    key: 'Most Viewed',
    text: 'Most Viewed',
    value: 'Most Viewed'
  }
]

const PostComments = ({ postId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [commentList, setCommentList] = useState(undefined);
  const [filterType, setFilterType] = useState("Most Recent");

  const handlePageChange = (event, data) => {
    if (data.totalPages === 0) {
      return;
    }
    // setHasLoaded(false);
    setCurrentPage(data.activePage);
    fetchCommentList(data.activePage);
  }

  const handleFilterChange = (event, data) => {
    setFilterType(data.value);
    setCurrentPage(1);
    fetchCommentList(1);
  }

  const fetchCommentList = (pageNumber) => {
    /*
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: postId, filter: filterType })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/posts`, settings
      );

      const result = await response.json();

      console.log(result);
      console.log(result.data);

      console.log(result.data[0]);

      if (result.data && result.data.length > 0) {
        setCommentList(result.data);
        console.log("result.count[0]: ");
        console.log(result.count[0].count);

        console.log(Math.ceil(result.count[0].count));
        setTotalPages(Math.ceil(result.count[0].count / 10));
      } else {
        setCommentList(null);
      }
    } catch (error) {
      console.log(error);
    }
    */

    console.log("Loading new dataset!");
    setCommentList([{comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()},
      {comment_id: faker.random.number(), content: faker.lorem.text(), views: faker.random.number()}
    ]);

    return;
  }

  const renderComments = () => {
    var resultJSX = [];
    commentList.forEach((comment) => {
      var current = (
        <>
          <Grid.Row columns={4}>
            <Grid.Column>
              <p style={{ textAlign: 'left', fontFamily: 'Raleway', fontSize: '20px', fontWeight: '500' }} onMouseOver={() => { console.log(comment["comment_id"])}}>{comment["content"]}</p>
            </Grid.Column>

            <Grid.Column>
              <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{comment["views"]} views</p>
            </Grid.Column>
          </Grid.Row>
          <Divider style={{ maxWidth: '90vw' }}/>
        </>
      );
      resultJSX.push(current);
    });
    return resultJSX;
  }

  if (commentList === undefined) {
    fetchCommentList(currentPage);
    return (
      <h1>Put loader here later</h1>
    );
  }

  if (commentList === null) {
    return (
      <h1>No results found</h1>
    );
  }

  return (
    <Grid textAlign="center" columns={1}>
      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>

      <Grid.Row columns={1}>
        <Pagination activePage={currentPage} totalPages={5} onPageChange={ handlePageChange } style={{ height: 'max-content' }}/>
        <span style={{ marginLeft: '2%', marginTop: '0.85%', fontFamily: 'Raleway', fontSize: '16px' }}>
          {"Filter by "}
          <Dropdown inline options={ sortOptions }
            defaultValue={ sortOptions[0].value }
            style={{ color: 'rgb(33, 133, 208)' }}
            onChange={ handleFilterChange }
          />
        </span>
      </Grid.Row>

      <Divider style={{ maxWidth: '90vw' }}/>

      { renderComments() }

      <Grid.Row columns={1}>
        <Pagination activePage={currentPage} totalPages={5} onPageChange={ handlePageChange } style={{ height: 'max-content' }}/>
      </Grid.Row>

      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>

    </Grid>
  );
}

export default PostComments;
