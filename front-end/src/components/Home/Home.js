import React, { useEffect, useState }  from 'react';
import {AppBar, Button, Container,Grid,Grow, Paper, TextField} from '@material-ui/core'; 
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux'
import {getPosts,getPostsBySearch} from '../../actions/posts'
import Pagination from '../Pagination';
import {useHistory,useLocation} from 'react-router-dom'
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input'

// A custom hook that builds on useLocation to parse
// the query string for you.
// react router dom hook 
// the browser's built-in URLSearchParams API. 
// .search is useLocation method 
function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const [currentId,setCurrentId]=useState(null);
    const [search,setSearch]=useState('');
    const [tags,setTags]=useState([]);
    const classes=useStyles();
  const dispatch=useDispatch();
  const history=useHistory();
  const query=useQuery();
  // check we have query parameter with page name 
  // if we have not page var we must be in 1 
  const page=query.get('page') || 1;
  const searchQuery=query.get('searchQuery')
  // console.log(page);
  
  // useEffect( () =>{
  
  // dispatch(getPosts());
  // when we submit form, it runs clear fun and it clears current id,
  // and it runs useeffect(useeffect depend on id),so again data fetch ,and we get 
  // updated data....
  // },[currentId,dispatch])

// user click on search button after this fun runs
  const searchPost =() =>{
    if(search.trim() || tags ){
      // trim() remove spaces 
      // search is state variable which store what user-writes

      // array dont allow to pass in url so we pass like 
      // string=>["usm","nom" ]=>"usm,nom"
    //The join() method creates and returns a new string
      
      dispatch(getPostsBySearch({search,tags:tags.join(",")}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
    }else{
      // if we have nothing to search then redirect
      history.push("/")
    }
  }
  const handleKeyPress =(e) =>{
    if(e.keyCode === 13){
      // search 
      // keyCode =13 means user press enter ,
      searchPost()
      console.log(`in key code ${e}`);
    }
  }

  const handleAdd =(tag) =>{
    setTags([...tags,tag])
  }
  const handleDelete =(tagToDelete) =>{
    setTags(tags.filter( (tag)=>tag !== tagToDelete ))
  }
    return (
        <>
       <Grow in>
    <Container maxWidth="xl">
      <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
<Grid item xs={12} sm={6} md={9}>
<Posts  setCurrentId={setCurrentId} />
</Grid>
<Grid item xs={12} sm={6} md={3}>
 {/* searching memories  */}
  <AppBar position="static" color="inherit" className={classes.appBarSearch}>
    <TextField
    name="search"
    label="Search Memories"
    variant="outlined"
    fullWidth
    onChange={(e) =>setSearch(e.target.value) }
    value={search}
    onKeyPress={handleKeyPress}    
    />
    
    <ChipInput
    style={{margin:'10px 0'}}
    value={tags}
    onAdd={handleAdd}
    onDelete={handleDelete}
    label="Search Tags"
    variant="outlined"
    />
    <Button onClick={searchPost} variant='contained' color="primary" className={classes.searchButton}>
      Search
    </Button>
  </AppBar>
<Form  currentId={currentId} setCurrentId={setCurrentId} />
{ (!searchQuery && !tags.length) && (
  <Paper elevation={6} className={classes.pagination}>
  <Pagination  page={page} />
</Paper>
) }

</Grid>
      </Grid>
    </Container>
  </Grow>     
        </>
    )
}

export default Home
