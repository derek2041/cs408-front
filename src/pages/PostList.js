import React, { useState } from 'react';
import { Grid, Message, Loader, Pagination, Button, Divider } from 'semantic-ui-react';

var faker = require("faker");

const PostList = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [postList, setPostList] = useState(null);

  const handlePageChange = (event, data) => {
    if (data.totalPages === 0) {
      return;
    }
    setHasLoaded(false);
    setCurrentPage(data.activePage);
    fetchPostList(data.activePage);
  }

  const fetchPostList = async (pageNumber) => {
    var parsedPostList = [];
    /*
    const response = await fetch(
      `http://...`
    );

    const result = await response.json();

    const posts = result.posts;

    /*
    parse json response, setPostList(...)
    */
    setPostList([{title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()},
      {title: faker.commerce.productName(), views: faker.random.number()}
    ]);

    return;
  }

  const renderPostList = () => {
    // use postList
    if (postList === null) {
      fetchPostList(currentPage);
      return (
        <Loader />
      );
    }

    var resultJSX = [];
    postList.forEach((post) => {
      var current = (
        <>
          <Grid.Row columns={4}>
            <Grid.Column>
              <p style={{ fontFamily: 'Raleway', fontSize: '28px' }}>{post["title"]}</p>
            </Grid.Column>

            <Grid.Column>
              <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{post["views"]} views</p>
            </Grid.Column>

            <Grid.Column>
              <Button>View Post</Button>
            </Grid.Column>
          </Grid.Row>
          <Divider style={{ maxWidth: '90vw' }}/>
        </>
      );
      resultJSX.push(current);
    });
    return resultJSX;
  }

  return (
    <Grid textAlign="center" columns={1} style={{ height: '100vh'}}>
      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>
      <Grid.Row columns={1}>
        <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} style={{ height: 'max-content' }}/>
      </Grid.Row>
      <Divider style={{ maxWidth: '90vw' }}/>
      { renderPostList() }
      <Grid.Row columns={1}>
        <Pagination activePage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} style={{ height: 'max-content' }}/>
      </Grid.Row>
      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>
    </Grid>
  );
}

export default PostList;
