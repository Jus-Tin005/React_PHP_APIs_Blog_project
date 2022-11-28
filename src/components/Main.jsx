import React, {useState, useEffect} from "react";
import {Paginator, Container, PageGroup,usePaginator} from "chakra-paginator";
import { Grid } from "@chakra-ui/react";
import PostList from "./blogComponets/PostList";
export default function Main() {

  const [postsTotal, setPoststotal] = useState(undefined);
  const [posts,setPosts] = useState([]);

  const {
    pagesQuatity,
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
  } = usePaginator({
      total: postsTotal,
      initialState:{
        pageSize:10,
        isDisabled: false,
        currentPage:1
      }
  });

  const normalStyles = {
    w:10,
    h:10,
    bg:"#333",
    color:"#fff",
    fontSize:'lg',
    _hover:{
      bg:'red',
      color:'#fff',
    }
  }

  const activeStyles = {
      w:10,
      h:10,
      bg:"green",
      color:"#fff",
      fontSize:'lg',
      _hover:{
        bg:'blue',
      }
  }

  /**
   * Fetching posts from database
   */

  const fetchPosts = async (pageSize,offset) => {
    const res = await fetch(
      `http://localhost/react_php_apis_project/backend/posts?limit=${pageSize} & offset=${offset}`
    );

    return await res.json();
  }

  useEffect(() =>{

    let pageSize = 10,
         offset = 0;

    fetchPosts(pageSize, offset).then((posts)=>{
      // console.log(posts);
      setPoststotal(posts.count);
      setPosts(posts.posts);
      // console.log(posts.posts);
    });
  },[currentPage,pageSize,offset]);


  return (
    <Paginator
    pagesQuantity={pagesQuatity}
    currentPage={currentPage}
    onPageChange={setCurrentPage}
    activeStyles={activeStyles}
    normalStyles={normalStyles}
    >
        <Grid templateColumns='repeat(4,1fr)' gap={6}>
              {posts.map(function(id,title,content,user_id,image){
                   return <PostList key={id} id={id} title={title} content={content} userId={user_id} image={image}/>
              })}
        </Grid>
        <Container align="center" justify="space-between" w="full" p={4} marginTop={'50px'}>
            <PageGroup isInline align="center"/>
        </Container>
    </Paginator>
  )
}
