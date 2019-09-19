import React, { useState } from 'react';
import { Grid, Input, Button, Icon, Modal, TextArea, Header, Message, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';



const PostContent = ({ username, password }) => {
    const url = window.location.href;

    const [searchQuery, setSearchQuery] = useState("");

    const [instanceKey, setInstanceKey] = useState(0);
    const handleReset = () => setInstanceKey(i => i + 1);
    // const [newPostTitle, updateNewPostTitle] = useState("");
    // const [newPostText, updateNewPostText] = useState("");

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
    // }


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
          </Grid.Row>
        </Grid>
        <CommentList key={instanceKey} pageType={"posts"} searchQuery={searchQuery} username={username} password={password} />
      </>
    );
  }
}

export default PostContent;
