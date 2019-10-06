import React, { useState } from 'react';
import { Grid, Modal, TextArea, Popup, Header, Container, Placeholder, Divider, Pagination, Dropdown, Button, Icon, Confirm } from 'semantic-ui-react';

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

const PostComments = ({ postId, username, password }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [commentList, setCommentList] = useState(undefined);
  const [filterType, setFilterType] = useState("Most Recent");
  const [showDelete, setShowDelete] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const handlePageChange = (event, data) => {
    if (data.totalPages === 0) {
      return;
    }
    // setHasLoaded(false);
    setCurrentPage(data.activePage);
    fetchCommentList(data.activePage, filterType);
  }

  const handleEditTextChange = (event, data) => {
    setEditCommentText(data.value);
  }

  const handleFilterChange = (event, data) => {
    console.log("filter changed to:");
    console.log(data.value);
    setFilterType(data.value);
    setCurrentPage(1);
    fetchCommentList(1, data.value);
  }

  const submitDelete = async (commentId) => {
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment_id: commentId, username: username, password: password })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/delete`, settings
      );

      const result = await response.json();

      console.log(result);

    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }

  const fetchCommentList = async (pageNumber, filterType) => {

    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: postId, filter: filterType })
    };

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

      // console.log(result);

    } catch (error) {
      console.log(error);
    }
  }

  const renderComments = () => {
    var resultJSX = [];
    commentList.forEach((comment) => {
      var current = (
        <>
          <Grid.Row columns={4}>
            <Grid.Column>
              <p style={{ textAlign: 'left', fontFamily: 'Raleway', fontSize: '20px', fontWeight: '500' }} onMouseOver={() => { updateViewCount(comment["id"]); }}>{comment["content"]}</p>
            </Grid.Column>

            <Grid.Column>
              <p style={{ fontFamily: 'Raleway', fontSize: '20px' }}>{comment["comment_views"]} views</p>
            </Grid.Column>

            <Grid.Column>
              { renderDeleteButton(comment["username"], comment["id"]) }
              { renderEditButton(comment["username"], comment["id"], comment["content"]) }
            </Grid.Column>
          </Grid.Row>
          <Divider style={{ maxWidth: '90vw' }}/>
        </>
      );
      resultJSX.push(current);
    });
    return resultJSX;
  }

  const renderDeleteButton = (inputUsername, commentId) => {
    if (inputUsername === username) {
      return (
        <>
          <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
            onClick={ () => { setShowDelete(true); }}
          >
            <Icon name='delete' />
          </Button>

          <Confirm
            content='Are you sure you want to delete this comment?'
            confirmButton='Yes'
            cancelButton='No'
            open={ showDelete === true }
            onCancel={ () => { setShowDelete(false); } }
            onConfirm={ () => { submitDelete(commentId) }}
            style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
          />
        </>
      );
    } else {
      return null;
    }
  }

  const saveEditedComment = async (commentId) => {
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password, comment_id: commentId, content: editCommentText })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/edit`, settings
      );

      const result = await response.json();

      // console.log(result);

    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  }

  const renderEditButton = (inputUsername, commentId, content) => {
    if (inputUsername === username) {
      return (
        <>
          <Modal open={ modalVisible }
            size="large"
            dimmer="blurring"
            closeOnDimmerClick={ true }
            closeOnDocumentClick={ true }
            onOpen={ () => { setEditCommentText(content); } }
            onClose={ () => { setModalVisible(false); setEditCommentText(""); } }
          >
            <Header style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }}>Edit Comment</Header>

            <Modal.Content>
              <Grid textAlign="center" columns={1}>

                <Grid.Row>
                  <TextArea id="content" placeholder='Edit Comment' defaultValue={ content } style={{ maxWidth: '85%', minWidth: '85%', minHeight: '350px', fontFamily: 'Raleway', fontSize: '16px', padding: '20px', borderRadius: '25px' }}
                   onChange={ handleEditTextChange } />
                </Grid.Row>

                <Divider />

                <Grid.Row>
                  <Button id="submit-post"
                    primary
                    disabled={ editCommentText === "" }
                    style={{ fontFamily: 'Raleway', width: '200px', fontSize: '18px' }}
                    onClick={ () => { saveEditedComment(commentId, content) }}
                  >
                    Save Comment
                  </Button>
                </Grid.Row>
              </Grid>
            </Modal.Content>
          </Modal>
          <Popup
            content="Edit Comment"
            mouseEnterDelay={500}
            position='top center'
            on='hover'
            style={{ fontFamily: 'Raleway', fontSize: '14px', fontWeight: '500', borderRadius: '50px' }}
            trigger={
              <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
                onClick={ () => { setModalVisible(true); } }>
                <Icon name='edit' />
              </Button>
            }
          />
        </>
      );
    } else {
      return null;
    }
  }

  if (commentList === undefined) {
    fetchCommentList(currentPage, filterType);
    return (
      <h1>Put loader here later</h1>
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
