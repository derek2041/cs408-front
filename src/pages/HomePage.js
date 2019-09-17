import React, { useState } from 'react';
import { Grid, Input, Button, Icon, Modal, TextArea, Header, Message, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PostList from './PostList';

const HomePage = ({ isLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostTitle, updateNewPostTitle] = useState("");
  const [newPostText, updateNewPostText] = useState("");

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

  const submitNewPost = () => {
    // send POST to API...
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
            size="large"
            dimmer="blurring"
            trigger={
              <Button primary animated='fade' disabled={ isLoggedIn === false } style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px', minWidth: '125px', marginTop: '1.4%', marginLeft: '1.4%' }}>
                <Button.Content visible>
                  <Icon name='plus' />
                </Button.Content>
                <Button.Content hidden>New Post</Button.Content>
              </Button>
            }
          >
            <Header style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }}>New Post Submission</Header>

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
                  <Button id="submit-post" as={ Link } to='/my-posts' primary disabled={ (newPostTitle === "" || newPostText === "") } style={{ fontFamily: 'Raleway', width: '200px', fontSize: '18px' }} onClick={ submitNewPost }>
                    Submit Post
                  </Button>
                </Grid.Row>
              </Grid>
            </Modal.Content>

          </Modal>
        </Grid.Row>
      </Grid>
      <PostList key={instanceKey} pageType={"posts"} searchQuery={searchQuery} username={""} password={""} />
    </>
  );
}

export default HomePage;
