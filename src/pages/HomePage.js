import React, { useState } from 'react';
import { Grid, Input, Button, Icon } from 'semantic-ui-react';
import PostList from './PostList';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const executeSearch = (event) => {
    console.log(event);
    // console.log(event.target.value); this synethetic event is reused for performance reasons (released/nullified afterwards)
    if (event.key === "Enter") {
      setSearchQuery(event.target.value);
      console.log("Pressed enter");
      console.log(event.target);
      console.log(event.target.value);
    } else {

    }
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
          <Button primary animated='fade' style={{ height: 'max-content', fontFamily: 'Raleway', fontWeight: '600', fontSize: '18px', minWidth: '125px', marginTop: '1.4%', marginLeft: '1.4%' }}>
            <Button.Content visible>
              <Icon name='plus' />
            </Button.Content>
            <Button.Content hidden>New Post</Button.Content>
          </Button>
        </Grid.Row>
      </Grid>
      <PostList />
    </>
  );
}

export default HomePage;
