import React, { useState,useEffect } from 'react'
import useStyles from './styles';
import {Paper,Typography,Button,TextField} from '@material-ui/core'
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {createPost,updatePost} from '../../actions/posts';
import {useHistory} from 'react-router-dom'

const Form = ({currentId,setCurrentId}) => {
   const [postData,setPostData]=useState({
       title:"",message:"",tags:"",selectedFile:""
   }) ;
   const dispatch=useDispatch();
    const classes=useStyles();
    const post=useSelector( (state) =>currentId ? state.posts.posts.find( (p) =>p._id === currentId ):null  );
    const user=JSON.parse(localStorage.getItem("profile"))
    const history=useHistory();

    useEffect( () =>{

if(post) setPostData(post)
// when post is updated,or we get post ,useeffect runs,
console.log('i am in post');
    },[post])

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}));
            clear()
        }else{
            dispatch(createPost({...postData,name:user?.result?.name},history));
            clear()
        }

        
    }
    const changeHandler = (e) =>{
        const {name,value} = e.target;
        
        setPostData({
            ...postData,
            [name]:value
        })
    }
   const clear = () =>{
setCurrentId(0)
setPostData({title:"",message:"",tags:"",selectedFile:"" })
   } 

if(!user?.result?.name){
    return(
        <Paper className={classes.paper} elevation={6}>
            <Typography variant="h6" align="center">
                Please sign in to create your own memories and like others memories.
                 </Typography>
        </Paper>
    )
}

    return (
        <>
         <Paper className={classes.paper}>
 <form autoComplete="off" noValidate className={`${classes.form} ${classes.root} `} onSubmit={handleSubmit}>
<Typography variant="h6">{currentId ? 'Editing':'Creating'} a Memory </Typography>
<TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={changeHandler}  />
<TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={changeHandler}  />

{/* .split(",") its important because if we not write split then  */}
{/* tags store in db like tags=[usman noman asia] so its a single word with spaces between  */}
{/* thats why we write comma(,) to separate all tags or words  */}
{/* The split() method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array. */}
{/* expected output of .split(",")means separate words by , ["usman","noman","arooba"] */}

<TextField name="tags" variant="outlined" label="Tags" 
fullWidth value={postData.tags}
 onChange={(e) =>setPostData({...postData,tags:e.target.value.split(",")})}  />

<div className={classes.fileInput}>
<FileBase type="file" multiple={false}
onDone={({base64}) => setPostData({...postData,selectedFile:base64})}/>  
</div>

<Button variant="contained" color="primary" className={classes.buttonSubmit}
size="large" type="submit" fullWidth  >Submit</Button>

<Button variant="contained" color="secondary" onClick={clear}
size="small"  fullWidth  >Clear</Button>
         </form>    
            </Paper>
        </>
    )
}

export default Form
