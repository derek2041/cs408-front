import React, { useState } from 'react';
import { Grid, Message, Icon, Button, Input } from 'semantic-ui-react';

const ChangePassword = ({ username, sessionUserCallback }) => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const submitPasswordChange = async () => {
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: oldPassword, new_password: newPassword})
    };
    try {
      const response = await fetch(
        `http://13.58.109.119:3001/users/password`, settings
      );

      const result = await response.json();

      console.log(result);

      if (result && result.status === "success") {
        sessionUserCallback(username, newPassword);
        setIsValid(true);
        window.history.back();
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.log(error);
      setIsValid(false);
    }
  }

  const updateOldPassword = (event, data) => {
    setOldPassword(data.value);
  }

  const updateNewPassword = (event, data) => {
    setNewPassword(data.value);
  }

  const updateConfirmPassword = (event, data) => {
    setConfirmPassword(data.value);
  }

  return (
    <>
      <Grid textAlign="center" columns={1}>
        <Grid.Row style={{ marginTop: '2.5%' }}>
          <Message hidden={ isValid } error={true} style={{ width: '80%', textAlign: 'center' }}>
            <Message.Header style={{ fontFamily: 'Raleway', fontSize: '18px' }}>
              <Icon size='large' name='warning sign' />
              {"Change Request Failed"}
            </Message.Header>
            <p style={{ fontFamily: 'Raleway', fontWeight: '600', fontSize: '16px' }}>
              There was an error trying to change your password. Please make sure you have
              entered your current password correctly and that your new password is at least
              6 characters in length and only contains alphanumeric characters.
            </p>
          </Message>
        </Grid.Row>
      </Grid>

      <Grid id="change-password" textAlign="center" columns={2} style={{ marginLeft: '12.7%' }}>
        <Grid.Row style={{ marginTop: '3%' }}>
          <p style={{ fontFamily: 'Raleway', fontSize: '20px', marginTop: '0.6%', marginRight: '3.8%', width: '200px' }}>Old Password:</p>
          <Input type="password" onChange={ (event, data) => { updateOldPassword(event, data); }} style={{ width: '35%', maxHeight: '45px', fontSize: '20px' }}/>
        </Grid.Row>

        <Grid.Row>
          <p style={{ fontFamily: 'Raleway', fontSize: '20px', marginTop: '0.6%', marginRight: '3.8%', width: '200px' }}>New Password:</p>
          <Input type="password" onChange={ (event, data) => { updateNewPassword(event, data); }} style={{ width: '35%', maxHeight: '45px', fontSize: '20px' }}/>
        </Grid.Row>

        <Grid.Row>
          <p style={{ fontFamily: 'Raleway', fontSize: '20px', marginTop: '0.6%', marginRight: '3.8%', width: '200px' }}>Confirm Password:</p>
          <Input type="password" onChange={ (event, data) => { updateConfirmPassword(event, data); }} style={{ width: '35%', maxHeight: '45px', fontSize: '20px' }}/>
        </Grid.Row>

        <Grid.Row style={{ marginBottom: '2%' }}>
          <Button primary style={{ fontFamily: 'Raleway', width: '150px', fontSize: '18px' }} onClick={ () => {
            var regex = /[^a-zA-Z0-9]/g;
            if (newPassword.length < 6 || newPassword.match(regex) || newPassword !== confirmPassword) {
              setIsValid(false);
            } else {
              submitPasswordChange();
            }
          }}
          >
            Submit
          </Button>
        </Grid.Row>
      </Grid>
    </>
  );
}

export default ChangePassword;
