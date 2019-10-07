import React, { useState } from 'react';
import { Grid, Modal, TextArea, Popup, Header, Container, Placeholder, Divider, Pagination, Dropdown, Button, Icon, Confirm } from 'semantic-ui-react';


const CommentActions = ({ username, password, data }) => {

  const [editCommentText, setEditCommentText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const submitDelete = async () => {
    var response;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment_id: data["id"], username: username, password: password })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/delete`, settings
      );

      const result = await response.json();

      console.log(result);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }

  }

  const handleEditTextChange = (event, data) => {
    setEditCommentText(data.value);
  }

  const saveEditedComment = async () => {
    var response;
    console.log("FINAL EDIT COMMENT TEXT: " + editCommentText);
    console.log("FINAL EDIT COMMENT ID: " + data["id"]);

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password, comment_id: data["id"], content: editCommentText })
    };

    try {
      response = await fetch(
        `http://13.58.109.119:3001/comments/edit`, settings
      );

      const result = await response.json();

      console.log(result);
      window.location.reload();

    } catch (error) {
      console.log(error);
    }

  }

  const renderEditButton = () => {
    const final_content = data["content"];
    // const final_id = data["id"];

    if (data["username"] === username) {
      console.log("INIT CONTENT: " + final_content);
      console.log("INIT COMMENT ID: " + data["id"]);

      return (
        <>
          <Modal open={ modalVisible }
            size="large"
            dimmer="blurring"
            closeOnDimmerClick={ true }
            closeOnDocumentClick={ true }
            onClose={ () => { setModalVisible(false); setEditCommentText(""); }}
          >
            <Header style={{ fontFamily: 'Raleway', fontSize: '24px', color: '#2185d0' }}>Edit Comment</Header>

            <Modal.Content>
              <Grid textAlign="center" columns={1}>

                <Grid.Row>
                  <TextArea id="content" placeholder='Edit Comment' defaultValue={ final_content } style={{ maxWidth: '85%', minWidth: '85%', minHeight: '350px', fontFamily: 'Raleway', fontSize: '16px', padding: '20px', borderRadius: '25px' }}
                   onChange={ handleEditTextChange } />
                </Grid.Row>

                <Divider />

                <Grid.Row>
                  <Button id="save-comment"
                    primary
                    disabled={ editCommentText === "" }
                    style={{ fontFamily: 'Raleway', width: '200px', fontSize: '18px' }}
                    onClick={ () => {
                      const final_id = data["id"];
                      saveEditedComment(final_id);
                    }}
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
              <Button icon style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
                onClick={ () => { setModalVisible(true) }}>
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

  const renderDeleteButton = () => {
    if (data["username"] === username) {
      return (
        <>
          <Popup
            content="Delete Comment"
            mouseEnterDelay={500}
            position='top center'
            on='hover'
            style={{ fontFamily: 'Raleway', fontSize: '14px', fontWeight: '500', borderRadius: '50px' }}
            trigger={
              <Button icon style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
                onClick={ () => { setShowDelete(true) }}
              >
                <Icon name='delete' />
              </Button>
            }
          />

          <Confirm
            content='Are you sure you want to delete this comment?'
            confirmButton='Yes'
            cancelButton='No'
            open={ showDelete === true }
            onCancel={ () => { setShowDelete(false) }}
            onConfirm={ submitDelete }
            style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px' }}
          />
        </>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      { renderEditButton() }
      { renderDeleteButton() }
    </>
  );
}

export default CommentActions;
