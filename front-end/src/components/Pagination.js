import React, { useEffect } from 'react'
import { Pagination,PaginationItem } from '@material-ui/lab'
import useStyles from './styles';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts';

const Paginate = ({page}) => {
  //  numberOfPages its an object..
    const {numberOfPages}=useSelector( (state) => state.posts)
    const classes=useStyles();
    const dispatch=useDispatch()

    // console.log(typeof Number(page));
    useEffect( () =>{
if(page) dispatch(getPosts(page))
    },[page])

    // const checkPag =() =>{
    //     console.log('at pagination');
    // }
    return (
        <>
        <Pagination 
        classes={{ul:classes.ul}}
        count={numberOfPages}
       page={Number(page) || 1} 
       
        variant="outlined"
        color="primary"
        renderItem={(item) =>(
            <PaginationItem 
            {...item} component={Link} to={`/posts?page=${item.page}`}
            />
        )}
        
        
        
        />    
        </>
    )
}

export default Paginate
