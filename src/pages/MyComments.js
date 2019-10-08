import React from 'react';
// import { Grid, Input } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import PostComments from './PostComments';

const MyComments = ({ username, password }) => {
  // const [searchQuery, setSearchQuery] = useState("");
  //
  // const [instanceKey, setInstanceKey] = useState(0);
  // const handleReset = () => setInstanceKey(i => i + 1);
  // const [newPostTitle, updateNewPostTitle] = useState("");
  // const [newPostText, updateNewPostText] = useState("");


  return (
    <PostComments postId={ -1 } username={ username } password={ password } />
  );
}

export default MyComments;
