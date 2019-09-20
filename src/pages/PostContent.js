import React, { useState } from 'react';
import { Grid, Input, Button, Icon, Modal, TextArea, Header, Message, Divider, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import CommentList from './CommentList';



const PostContent = ({ username, password }) => {
    const url = window.location.href;
    const [content, setContent] = useState(undefined);

    const [instanceKey, setInstanceKey] = useState(0);
    const handleReset = () => setInstanceKey(i => i + 1);

    const postId = url.slice(url.lastIndexOf(':')+1);


    const fetchCommentList = async (postId) => {

      var response;

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: postId })
      };

      try {
        response = await fetch(
          `http://13.58.109.119:3001/posts/view`, settings
        );

        const result = await response.json();

        console.log(result);

        setContent(result)
      } catch (error) {
        console.log(error);
      }


      /*
      parse json response, setPostList(...)
      */
      console.log("Loading new dataset!");
      return;
    }

    // fetchCommentList(postId);
    if (content === undefined) {
      fetchCommentList(postId);
      return (
        <h1>temp</h1>
      );
    }

    return (
        <Grid textAlign="center" columns={1}>
          <Container text style={{ marginTop: '3%', width: '80%', borderStyle: 'solid', borderColor: 'yellow'}}>
            <Header as='h2'>{content.title}</Header>
            <p>
              {content.content}
            </p>
          </Container>
        </Grid>
    );
}


export default PostContent;
