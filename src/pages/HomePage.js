import React, { useState } from 'react';
import { Grid, Input, Button, Icon, Modal, TextArea, Header, Divider } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import PostList from './PostList';

const HomePage = ({ username, password, isLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostTitle, updateNewPostTitle] = useState("");
  const [newPostText, updateNewPostText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [instanceKey, setInstanceKey] = useState(0);
  const handleReset = () => setInstanceKey(i => i + 1);

  const executeSearch = (event) => {
    console.log(event);
    // console.log(event.target.value); this synethetic event is reused for performance reasons (released/nullified afterwards)
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
      handleReset();
      console.log("Pressed enter");
      console.log(event.target);
      console.log(event.target.value);
    } else {

    }
  }

  const handleTitleChange = (event, data) => {
    // console.log(data.value);
    updateNewPostTitle(data.value);
  }

  const handleTextChange = (event, data) => {
    // console.log(data.value);
    updateNewPostText(data.value);
  }

  const submitNewPost = async () => {
    // send POST to API...
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username,
        password: password, title: newPostTitle,
        content: newPostText })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/posts/new`, settings
      );

      const result = await response.json();

      // console.log(result);

      if (result) {
        // sessionUserCallback(loginUsername, loginPassword);
        // setIsValidLogin(true);
        console.log(result);
        setModalVisible(false);
        handleReset();
        // window.location.href = "http://13.58.109.119:3000/my-posts/";
        // setPostList(result);
      } else {
        // sessionUserCallback(null, null);
        // setIsValidLogin(false);
        // setPostList(null);
        console.log("[WARN]: no result returned from API")
      }
    } catch (error) {
      console.log(error);
      // sessionUserCallback(null, null);
      // setIsValidLogin(false);
    }

    // window.location.reload();
  }

  return (
    <>
      <Grid textAlign="center" columns={1}>
        <Grid.Row columns={1}>
          <Input
            id="search-bar"
            icon={{ name: 'search', circular: true, link: false}}
            placeholder="Search for post..."
            onKeyPress={ executeSearch }
            style={{ width: '50%', fontSize: '24px', marginTop: '1%' }}
          />

          <Modal
            open={ modalVisible }
            closeOnDimmerClick={ true }
            closeOnDocumentClick={ true }
            onClose={ () => { setModalVisible(false) }}
            size="large"
            dimmer="blurring"
          >
            <Header icon='plus' content='New Post Submission' style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }} />

            <Modal.Content>
              <Grid textAlign="center" columns={1}>
                <Grid.Row>
                  <Input id="title" placeholder="New Post Title" style={{ width: '85%', maxHeight: '45px', fontSize: '20px' }}
                   onChange={ handleTitleChange }/>
                </Grid.Row>

                <Divider />

                <Grid.Row>
                  <TextArea id="content" placeholder='New Post Text' style={{ maxWidth: '85%', minWidth: '85%', minHeight: '350px', fontFamily: 'Raleway', fontSize: '16px', padding: '20px', borderRadius: '25px' }}
                   onChange={ handleTextChange } />
                </Grid.Row>

                <Divider />

                <Grid.Row>
                  <Button id="submit-post" primary disabled={ (newPostTitle === "" || newPostText === "") } style={{ fontFamily: 'Raleway', width: '200px', fontSize: '18px' }} onClick={ submitNewPost }>
                    Submit Post
                  </Button>
                </Grid.Row>
              </Grid>
            </Modal.Content>

          </Modal>

          <Button primary animated='fade' disabled={ isLoggedIn === false } onClick={ () => { setModalVisible(true) }} style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px', minWidth: '125px', marginTop: '1.4%', marginLeft: '1.4%' }}>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
            <Button.Content hidden>New Post</Button.Content>
          </Button>
        </Grid.Row>
      </Grid>
      <PostList key={instanceKey} pageType={"home"} searchQuery={searchQuery} username={""} password={""} />
    </>
  );
}

export default HomePage;
