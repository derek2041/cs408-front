import React, { useState } from 'react';
import { Grid, Message, Placeholder, Divider, Pagination, Dropdown, Button, Icon } from 'semantic-ui-react';
import CommentActions from './CommentActions';

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

const PostComments = ({ postId, username, password }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [commentList, setCommentList] = useState(undefined);
  const [filterType, setFilterType] = useState("Most Recent");

  const updateCallback = () => {
    // setCommentList(undefined);
    fetchCommentList(currentPage, filterType);
  }

  const handlePageChange = (event, data) => {
    if (data.totalPages === 0) {
      return;
    }
    // setHasLoaded(false);
    setCurrentPage(data.activePage);
    fetchCommentList(data.activePage, filterType);
  }

  const handleFilterChange = (event, data) => {
    console.log("filter changed to:");
    console.log(data.value);
    setFilterType(data.value);
    setCurrentPage(1);
    fetchCommentList(1, data.value);
  }

  const fetchCommentList = async (pageNumber, filterType) => {

    var response;
    var settings;

    if (postId === -1) {
      settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, filter: filterType, pageNumber: pageNumber, username: username, password: password })
      };
    } else {
      settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, filter: filterType, pageNumber: pageNumber })
      };
    }

    console.log("TRUE FILTER TYPE:");
    console.log(filterType);

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/`, settings
      );

      const result = await response.json();

      console.log(result);

      if (result.comments && result.comments.length > 0) {
        setCommentList(result.comments);
        console.log("result.count: ");
        console.log(result.count);

        setTotalPages(Math.ceil(result.count / 10));
        console.log("set total pages to:");
        console.log(Math.ceil(result.count / 10));
      } else {
        setCommentList(null);
      }
    } catch (error) {
      console.log(error);
    }


    // console.log("Loading new dataset!");
    // setCommentList([{id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()},
    //   {id: faker.random.number(), content: faker.lorem.text(), comment_views: faker.random.number()}
    // ]);

    return;
  }

  const updateViewCount = async (commentId) => {
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment_id: commentId })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/view`, settings
      );

      const result = await response.json();

      console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  const renderComments = () => {
    var resultJSX = [];

    if (postId === -1) {
      commentList.forEach((comment) => {
        var current = (
          <>
            <Grid.Row columns={5}>
              <Grid.Column style={{ minWidth: '35%' }} >
                <p style={{ textAlign: 'left', fontFamily: 'Raleway', fontSize: '20px', fontWeight: '500', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>{comment["content"]}</p>
              </Grid.Column>

              <Grid.Column style={{ maxWidth: '15%' }}>
                <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{comment["comment_views"]} views</p>
              </Grid.Column>

              <Grid.Column style={{ maxWidth: '15%', minWidth: 'max-content' }}>
                <CommentActions key={ comment["id"] }
                  username={ username }
                  password= { password }
                  data={ comment }
                  callback={ updateCallback }
                />
              </Grid.Column>

              <Grid.Column style={{ maxWidth: '15%' }}>
                <Button onClick={ () => {window.location.href="/post-view/:" + comment["post_id"]} } animated style={{ fontSize: '18px', fontFamily: 'Raleway', fontWeight: '500', minWidth: '137px' }}>
                  <Button.Content visible>
                    <Icon name='angle double right' />
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
    } else {
      commentList.forEach((comment) => {
        var current = (
          <>
            <Grid.Row columns={4}>
              <Grid.Column style={{ minWidth: '50%' }} >
                <p style={{ textAlign: 'left', fontFamily: 'Raleway', fontSize: '20px', fontWeight: '500', whiteSpace: 'pre-wrap' }} onMouseOver={() => { updateViewCount(comment["id"]); }}>{comment["content"]}</p>
              </Grid.Column>

              <Grid.Column style={{ maxWidth: '15%' }}>
                <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{comment["comment_views"]} views</p>
              </Grid.Column>

              <Grid.Column style={{ maxWidth: '15%', minWidth: 'max-content' }}>
                <CommentActions key={ comment["id"] }
                  username={ username }
                  password= { password }
                  data={ comment }
                  callback={ updateCallback }
                />
              </Grid.Column>
            </Grid.Row>
            <Divider style={{ maxWidth: '90vw' }}/>
          </>
        );
        resultJSX.push(current);
      });
      return resultJSX;
    }
  }


  if (commentList === undefined) {
    fetchCommentList(currentPage, filterType);
    return (
      <>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
        <Placeholder fluid={true} style={{ marginTop: '3%', marginLeft: '10%', marginRight: '10%' }}>
          <Placeholder.Paragraph>
            <Placeholder.Line length='full'/>
            <Placeholder.Line length='very long'/>
            <Placeholder.Line length='medium'/>
            <Placeholder.Line length='long'/>
            <Placeholder.Line length='short'/>
            <Placeholder.Line length='very short'/>
          </Placeholder.Paragraph>
        </Placeholder>
      </>
    );
  }

  if (postId === -1 && commentList === null) {
    return (
      <Grid textAlign="center" columns={1}>
        <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>
        <Grid.Row style={{ marginTop: '2.5%' }}>
          <Message warning={true} style={{ width: '80%', textAlign: 'center' }}>
            <Message.Header style={{ fontFamily: 'Raleway', fontSize: '18px' }}>
              <Icon size='big' name='info circle' />
              {"No Comments Found"}
            </Message.Header>
            <p style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '16px' }}>
              This means you have not posted any comments on any posts yet.
              Comments you post in the future will show up here!
            </p>
          </Message>
        </Grid.Row>
      </Grid>
    );
  }

  if (commentList === null) {
    console.log(">>>>>>>is NULLLL");
    return (
      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>
    );
  }

  return (
    <Grid textAlign="center" columns={1}>
      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>

      <Grid.Row columns={1}>
        <Pagination activePage={ currentPage } totalPages={ totalPages } onPageChange={ handlePageChange } style={{ height: 'max-content' }}/>
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
        <Pagination activePage={currentPage} totalPages={ totalPages } onPageChange={ handlePageChange } style={{ height: 'max-content' }}/>
      </Grid.Row>

      <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>

    </Grid>
  );
}

export default PostComments;
