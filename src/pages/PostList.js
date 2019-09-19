import React, { useState } from 'react';
import { Grid, Message, Loader, Pagination, Button, Divider, Icon } from 'semantic-ui-react';

var faker = require("faker");

const PostList = ({ pageType, searchQuery, username, password }) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
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

    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username,
        password: password, pageNumber: pageNumber,
        searchQuery: searchQuery, pageType: pageType })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/posts`, settings
      );

      const result = await response.json();

      console.log(result);
      console.log(result.data);
      console.log(result.posts);
      if (result.data && result.data.length > 0) {
        // sessionUserCallback(loginUsername, loginPassword);
        // setIsValidLogin(true);
        // console.log(result);
        setPostList(result.data);
        console.log("result.count[0]: ");
        console.log(result.count[0].count);

        console.log(Math.ceil(result.count[0].count));
        setTotalPages(Math.ceil(result.count[0].count / 10));
      } else {
        // sessionUserCallback(null, null);
        // setIsValidLogin(false);
        setPostList(null);
      }
    } catch (error) {
      console.log(error);
      // sessionUserCallback(null, null);
      // setIsValidLogin(false);
    }
    /*
    const response = await fetch(
      `http://...`
    );

    const result = await response.json();

    const posts = result.posts;

    /*
    parse json response, setPostList(...)
    */
    console.log("Loading new dataset!");
    // setPostList([{title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()},
    //   {title: faker.commerce.productName(), views: faker.random.number()}
    // ]);

    return;
  }

  const renderPostList = () => {
    console.log("SEARCH QUERY??: " + searchQuery);

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
              <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{post["post_views"]} views</p>
            </Grid.Column>

            <Grid.Column>
              <Button animated style={{ fontSize: '18px', fontFamily: 'Raleway', fontWeight: '500', minWidth: '137px' }}>
                <Button.Content visible>
                  <Icon name='arrow right' />
                </Button.Content>
                <Button.Content hidden>View Post</Button.Content>
              </Button>
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
