import React, { useState } from 'react';
import { Grid, Header, Message, Container, Placeholder, TextArea, Divider, Button, Popup, Icon, Modal, Input, Confirm } from 'semantic-ui-react';
import PostComments from './PostComments';
// import { Link } from 'react-router-dom';
// import CommentList from './CommentList';



const PostContent = ({ username, password }) => {
    const url = window.location.href;
    const [content, setContent] = useState(undefined);
    const [isCreator, setIsCreator] = useState(undefined);
    const [isBookmarked, setIsBookmarked] = useState(undefined);
    const [newCommentText, setNewCommentText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [editedPostTitle, setEditedPostTitle] = useState("");
    const [editedPostText, setEditedPostText] = useState("");

    const [instanceKey, setInstanceKey] = useState(0);
    const handleReset = () => setInstanceKey(i => i + 1);

    const postId = url.slice(url.lastIndexOf(':')+1);

    const handleTextChange = (event, data) => {
      setNewCommentText(data.value);
    }

    const handleEditTextChange = (event, data) => {
      setEditedPostText(data.value);
    }

    const handleEditTitleChange = (event, data) => {
      setEditedPostTitle(data.value);
    }

    const submitDelete = async () => {
      var response;

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, username: username, password: password })
      };

      try {
        response = await fetch(
          `http://13.58.109.119:3001/posts/delete`, settings
        );

        const result = await response.json();

        console.log(result);

      } catch (error) {
        console.log(error);
      }

      window.history.back();
      // window.location.href = "http://13.58.109.119:3000/";
    }

    const saveEditedPost = async () => {
      console.log("Submitting changes to post.");
      console.log(editedPostText);

      var response;

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, username: username, password: password, title: editedPostTitle, content: editedPostText })
      };

      try {
        response = await fetch(
          `http://13.58.109.119:3001/posts/edit`, settings
        );

        const result = await response.json();

        console.log(result);
        setModalVisible(false);
        fetchPostBody(postId);

      } catch (error) {
        console.log(error);
      }

      // window.location.reload();
    }

    const toggleBookmark = async () => {
      var response;

      if (isBookmarked === true) {
        setIsBookmarked(false);

        const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: postId, username: username, password: password, bookmark: false })
        };

        try {
          response = await fetch(
            `http://13.58.109.119:3001/bookmarks/delete`, settings
          );

          const result = await response.json();

          console.log(result);

        } catch (error) {
          console.log(error);
        }
        // setIsBookmarked(false);
      } else {
        setIsBookmarked(true);

        const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: postId, username: username, password: password, bookmark: true })
        };

        try {
          response = await fetch(
            `http://13.58.109.119:3001/bookmarks/new`, settings
          );

          const result = await response.json();

          console.log(result);

        } catch (error) {
          console.log(error);
        }

        // try {
        //   response = await fetch(
        //     `http://13.58.109.119:3001/posts/view`, settings
        //   );
        //
        //   const result = await response.json();
        //
        //   console.log(result);
        //
        //   setIsBookmarked(true);
        //
        // } catch (error) {
        //   console.log(error);
        // }
        setIsBookmarked(true);
      }
    }

    const renderDeleteButton = () => {
      if (username === null || username === "null") {
        return (
          <Button icon disabled style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
            <Icon name='trash alternate' />
          </Button>
        );
      }

      if (isCreator === true) {
        return (
          <>
            <Popup
              content="Delete Post"
              mouseEnterDelay={500}
              position='top center'
              on='hover'
              style={{ fontFamily: 'Raleway', fontSize: '14px', fontWeight: '500', borderRadius: '50px' }}
              trigger={
                <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
                  onClick={ () => { setShowDelete(true); }}
                >
                  <Icon name='trash alternate' />
                </Button>
              }
            />

            <Confirm
              content='Are you sure you want to delete this post?'
              confirmButton='Yes'
              cancelButton='No'
              open={ showDelete === true }
              onCancel={ () => { setShowDelete(false); } }
              onConfirm={ submitDelete }
              style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
            />
          </>
        );
      } else {
        return (
          <Button icon disabled style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
            <Icon name='trash alternate' />
          </Button>
        );
      }

      // return (
      //   <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
      //     disabled={ username === null || username === "null" }
      //   >
      //     <Icon name='edit' />
      //   </Button>
      // );
    }

    const renderBookmarkButton = () => {
      if (username === null || username === "null") {
        console.log("Rendering disabled bookmark!");
        return (
          <Button icon disabled style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
            <Icon name='bookmark' />
          </Button>
        );
      }
      if (isBookmarked === true) {
        return (
          <Popup
            content="Remove from Bookmarks"
            mouseEnterDelay={500}
            position='top center'
            on='hover'
            style={{ fontFamily: 'Raleway', fontSize: '14px', fontWeight: '500', borderRadius: '50px' }}
            trigger={
              <Button icon onClick={ toggleBookmark } style={{ background: 'limegreen', height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
                <Icon name='bookmark' />
              </Button>
            }
          />
        );
      } else {
        return (
          <Popup
            content="Add to Bookmarks"
            mouseEnterDelay={500}
            position='top center'
            on='hover'
            style={{ fontFamily: 'Raleway', fontSize: '14px', fontWeight: '500', borderRadius: '50px' }}
            trigger={
              <Button icon onClick={ toggleBookmark } style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
                <Icon name='bookmark' />
              </Button>
            }
          />
        );
      }

      // return (
      //   <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
      //     disabled={ username === null || username === "null" }
      //   >
      //     <Icon name='bookmark' />
      //   </Button>
      // );
    }

    const renderEditButton = () => {
      if (username === null || username === "null") {
        return (
          <Button icon disabled style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
            <Icon name='edit' />
          </Button>
        );
      }
      if (isCreator === true) {
        return (
          <>
            <Modal open={ modalVisible }
              size="large"
              dimmer="blurring"
              closeOnDimmerClick={ true }
              closeOnDocumentClick={ true }
              onClose={ () => { setModalVisible(false); } }
            >
              <Header icon='edit' content='Edit Post' style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }} />

              <Modal.Content>
                <Grid textAlign="center" columns={1}>
                  <Grid.Row>
                    <Input id="title" maxLength="200" placeholder="Edit Post Title" defaultValue={content.title} style={{ width: '85%', maxHeight: '45px', fontSize: '20px' }}
                     onChange={ handleEditTitleChange }/>
                  </Grid.Row>

                  <Divider />

                  <Grid.Row>
                    <TextArea id="content" maxLength="4000" placeholder='Edit Post Text' defaultValue={content.content} style={{ maxWidth: '85%', minWidth: '85%', minHeight: '350px', fontFamily: 'Raleway', fontSize: '16px', padding: '20px', borderRadius: '25px' }}
                     onChange={ handleEditTextChange } />
                  </Grid.Row>

                  <Divider />

                  <Grid.Row>
                    <Button id="submit-post" primary disabled={ (editedPostTitle === "" || editedPostText === "") } style={{ fontFamily: 'Raleway', width: '200px', fontSize: '18px' }} onClick={ saveEditedPost }>
                      Save Post
                    </Button>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
            </Modal>
            <Popup
              content="Edit Post"
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
        return (
          <Button icon disabled style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}>
            <Icon name='edit' />
          </Button>
        );
      }

      // return (
      //   <Button icon style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
      //     disabled={ username === null || username === "null" }
      //   >
      //     <Icon name='edit' />
      //   </Button>
      // );
    }

    const fetchPostBody = async (postId) => {

      var response;

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, username: username, password: password })
      };

      try {
        response = await fetch(
          `http://13.58.109.119:3001/posts/view`, settings
        );

        const result = await response.json();

        console.log(result);

        if (result.status === 404) {
          setContent(null);
          return;
        }

        setContent(result.post);
        setEditedPostTitle(result.post.title);
        setEditedPostText(result.post.content);

        setIsBookmarked(result.metadata.bookmarked);
        setIsCreator(result.metadata.creator);
        // setContent(result.content);
        // setIsCreator(result.creator);
        // setIsBookmarked(result.bookmarked);
      } catch (error) {
        console.log(error);
      }


      /*
      parse json response, setPostList(...)
      */
      console.log("Loading new dataset!");
      return;
    }

    const submitComment = async () => {
      var response;

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId, content: newCommentText, username: username, password: password })
      };

      response = await fetch(
        `http://13.58.109.119:3001/comments/new`, settings
      );

      const result = await response.json();

      console.log(result);
      setNewCommentText("");
      document.getElementById("content").value = "";
      handleReset();
      // window.location.reload();
    }

    // fetchPostBody(postId);
    if (content === undefined) {
      fetchPostBody(postId);
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

    if (content === null) {
      return (
        <Grid textAlign="center" columns={1}>
          <Grid.Row style={{ marginTop: '2.5%' }}>
            <Message warning={true} style={{ width: '80%', textAlign: 'center' }}>
              <Message.Header style={{ fontFamily: 'Raleway', fontSize: '18px' }}>
                <Icon size='big' name='info circle' />
                {"Post Not Found"}
              </Message.Header>
              <p style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '16px' }}>
                Oof! This post does not seem to exist. It may have been deleted by the original poster
                or you may be searching for a post that has not been created yet.
              </p>
            </Message>
          </Grid.Row>
        </Grid>
      );
    }

    console.log("USERNAME>>>" + username);

    return (
      <>
        <Grid textAlign="center" columns={1}>
          <Container id="post-content" text>
            <Header as='h2' style={{ marginTop: '3%', fontFamily: 'Raleway', color: 'rgb(33, 133, 208)', overflowWrap: 'break-word' }}>{content.title}</Header>
            <p style={{ marginBottom: '3%', fontFamily: 'Raleway', fontWeight: '500', fontSize: '18px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
              {content.content}
            </p>
          </Container>

          <Grid.Row style={{ marginTop: '1%' }}>

            { renderBookmarkButton() }

            { renderEditButton() }

            { renderDeleteButton() }

          </Grid.Row>
        </Grid>

        <Grid textAlign="center" columns={1}>
          <Divider style={{ width: '13337px', background: '#505359', borderBottom: '0px' }}/>
          <Grid.Row>
            <TextArea
              id="content"
              maxLength="1000"
              disabled={ username === null || username === "null" }
              placeholder='New Comment...'
              style={{ maxWidth: '75%', minWidth: '75%', minHeight: '150px', fontFamily: 'Raleway', fontSize: '16px', padding: '20px', borderRadius: '25px' }}
              onChange={ handleTextChange } />
          </Grid.Row>

          <Grid.Row>
            <Button primary
              disabled={ username === null || username === "null" || newCommentText.length < 1 }
              onClick={ submitComment }
              style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px', minWidth: '175px' }}
            >
              Add Comment
            </Button>
          </Grid.Row>
        </Grid>

        <PostComments key={ instanceKey } postId={ postId } username={ username } password={ password } />
      </>
    );
}


export default PostContent;
