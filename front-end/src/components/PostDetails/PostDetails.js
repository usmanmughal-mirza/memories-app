import React, { useEffect } from 'react'
import useStyles from './styles'
import {useHistory,useParams} from 'react-router-dom'
import {Paper,Typography,CircularProgress,Divider, Grid} from '@material-ui/core'
import moment from 'moment';
import {useDispatch,useSelector} from 'react-redux'
import {getPost,getPostsBySearch} from '../../actions/posts';

const PostDetails = () => {
    const {post,posts,isLoading}=useSelector( (state)=>state.posts )
   const dispatch=useDispatch();
   const history=useHistory();
   const {id}=useParams()
//  /posts/:id
    const classes=useStyles();
    

    useEffect( () =>{
        dispatch(getPost(id))
    },[id])
    

// recommended part --------
useEffect( () =>{
    if(post){
        dispatch(getPostsBySearch({search:'none',tags:post?.tags.join(",")}))
    }
},[post])

console.log('i only rndeer once');
 if(!post) return null;
 if(isLoading){
     return(
         <Paper elevation={6}>
<CircularProgress size="7em" />
</Paper>
     ) 
 }   

   const openPost =(id)=>history.push(`/posts/${id}`)

const recommendedPosts=posts.filter(({_id}) =>_id !==post._id  );
// console.log(recommendedPosts);
    return (
       <Paper style={{padding:'20px',borderRadius:'15px'}} elevation={6}>
           <div className={classes.card}>
               <div className={classes.section}>
                   <Typography variant="h3" component="h2">{post.title} </Typography>
                   <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map( (tag)=>`#${tag}` )} </Typography>
                   <Typography variant="body1" gutterBottom component="p">{post.message} </Typography>
                   <Typography variant="h6">Created By {post.name} </Typography>
                   <Typography variant="body1" >{moment(post.createdAt).fromNow() }  </Typography>
                  <Divider style={{margin:'20px 0'}}  />
                  <Typography variant="body1"> Realtime chat coming soon </Typography>
                  <Divider style={{margin:'20px 0'}}  />
                  <Typography variant="body1"> comments  coming soon </Typography>
                  <Divider style={{margin:'20px 0'}}  />
                   {/* <Typography variant="h3" component="h2">{post.title} </Typography> */}
               </div>
               <div className={classes.imageSection}>
                   <img className={classes.media} src={post.selectedFile || 'image'}  />
               </div>
           </div>
           {/* RECOMMENDED POSTS  */}
           {recommendedPosts.length && (
               <div className={classes.section} >
                   <Typography gutterBottom variant="h5">You might also like</Typography>
                   <Divider />
                   <div className={classes.recommendedPosts}>
                       <Grid container>
                            
                    
                       {recommendedPosts.map( ({title,message,name,_id,selectedFile,likes}) =>(
                           <Grid item xs={12} sm={6} md={4} lg={3}>
                             
                          <div style={{margin:'20px',cursor:"pointer",}} onClick={() =>openPost(_id)} key={_id}>
                           <Typography gutterBottom variant="h6">{title} </Typography>
                           <Typography gutterBottom variant="subtitle2">{name} </Typography>
                           <Typography gutterBottom variant="subtitle2">{message} </Typography>
                           <Typography gutterBottom variant="subtitle1">likes: {likes.length} </Typography>
                         <img src={selectedFile} width='200px' />
                           </div>
                           </Grid>
                       ))}
                         </Grid>
                   </div>
                 
               </div>
           )}
       </Paper>
    )
}

export default PostDetails
