import axios from 'axios';

const API=axios.create({baseURL:'http://127.0.0.1:8000'}) 
// const API=axios.create({baseURL:'https://memories-project-baig2.herokuapp.com/'})

// set headers 

API.interceptors.request.use(function (req) {
    if(localStorage.getItem("profile")){
      // req.headers=config.headers 
      req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
          }
     // if u add new Chainable promise or other interceptor
  // You have to return `req` inside of a rquest
  // otherwise u will get a very confusing error
  // and spend sometime to debug it.
 return req;
},function(error){
  console.log('in config error');
  return Promise.reject(error);
}
);


// const url='https://js-mastery-memories.herokuapp.com/posts';

export const fetchPost=(id)=>API.get(`/posts/${id}`)
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch =(searchQuery)=> API.get(`/posts/peoples/search?searchQuery=${searchQuery.search ||'none' }&tags=${searchQuery.tags} `) 
export const createPost=(newPost) =>API.post(`/posts`,newPost);
export const updatePost=(id,updatedPost) =>API.patch(`/posts/${id}`,updatedPost);
export const deletePost =(id) =>API.delete(`/posts/${id}`);
export const likePost =(id) =>API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) =>API.post('/user/signin',formData);
export const signUp = (formData) =>API.post('/user/signup',formData);

