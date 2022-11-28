// import {ColorModeSwitcher} from "./ColorModeSwitcher";
import {ChakraProvider, Box, Grid, VStack, Text, Flex, HStack, Spacer, Switch ,Stack, Container, useDisclosure, Modal, ModalOverlay, ModalHeader, ModalBody, FormControl, Input, ModalFooter, Button, ModalContent, UnorderedList,ListItem} from '@chakra-ui/react';
import {ThemeProvider} from "styled-components";
import {lightTheme,darkTheme,GlobalStyles} from "./theme";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import { MoonIcon, SunIcon, Search2Icon } from '@chakra-ui/icons';
import './App.css';
import  Main from "./components/Main";
import Contact from './components/pages/Contact';
import SinglePost from './components/blogComponets/SinglePost';
import NotFound from './components/blogComponets/NotFound';



function App() {
  const [theme, setTheme] = useState("light");
  const [isSwitchOn,setIsSwitchOn] = useState(true);
  const [searchTerm,setSearchTerm] = useState([]);
  const [searResultItems,setSearchResultItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  /*
   Swit theme on and off
  */
const changeThemeSwitch = () => {
    let newValue = null;
    newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    !newValue ? setTheme('dark') : setTheme('light');
}


function slug(string){
            return string.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
  }


// Get search results from database
const fetchSearchResults = async(searchTerm) => {
    const res = await fetch(
        `http://localhost/react_php_apis_project/backend/searchResult?keyword=${searchTerm}`,
        {
            method:"GET",
            headers:{
                "Access-Control-Allow-Origin" :  "*",
                "Content-Type" : "application/json"
            }
        }
    );
    return await res.json();
}


// when search term updates fetch data
useEffect(()=>{
        const getUserInput = setTimeout(()=>{
            fetchSearchResults(searchTerm).then((items) => {
                // console.log(items.posts);
                setSearchResultItems(items.posts);
            });
        },100);

        return () => clearTimeout(getUserInput);
},[searchTerm]);

  return (
    <ChakraProvider>
                    <BrowserRouter>
                          <GlobalStyles/>
                          <Box bg={theme === 'light' ? '#333' : '#fff'}
                                    borderBottom={theme === 'light' ? 'solid 1px #333' : 'solid 1px #fff'}
                                    color={theme === 'light' ? '#fff' : '#333'} px={4}>
                              <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                                  <HStack spacing={16} alignItems={'left'}>
                                        <HStack as={'nav'}
                                                       spacing={6}
                                                       display={{base:'none', md: 'flex'}}>
                                                        <Link to="/">Home</Link>
                                                        <Link to="/contact">Contact</Link>
                                        </HStack>
                                  </HStack>
                                        <Search2Icon onClick={onOpen}></Search2Icon>
                                        <Flex alignItems={'center'}>
                                                <Spacer></Spacer>
                                                <Stack direction={'row' } spacing={7}>
                                                        <Switch onChange={changeThemeSwitch}>
                                                              {isSwitchOn ? (<MoonIcon mr="5"/>) : (<SunIcon mr="5"/>)}
                                                        </Switch>
                                                </Stack>
                                        </Flex>
                              </Flex>
                          </Box>

                        <Modal
                            initialFocusRef={initialRef}
                            isCentered
                            onClose={onClose}
                            isOpen={isOpen}
                            motionPreset='slideInBottom'
                            bg='blue'
                        >
                                    <ModalOverlay
                                        bg="none"
                                        backgroundFilter="auto"
                                        backgroundInvert="80%"
                                        backgroundBlur='2px'
                                        >

                                       <ModalContent>
                                                    <ModalHeader
                                                        color={'#333'}
                                                    >
                                                            Type here to search....
                                                    </ModalHeader>
                                                    <ModalBody pb={6}>
                                                        <FormControl mt={4}>
                                                                    <Input
                                                                        placeholder=''
                                                                        ref={initialRef}
                                                                        color={'#333'}
                                                                        onChange={(e)=>setSearchTerm(e.target.value)}
                                                                    />
                                                        </FormControl>
                                                        <br/>
                                                        {setSearchResultItems &&
                                                        <UnorderedList>
                                                                {searResultItems.map(function(item){
                                                                    return (<Link to={slug(item.title)} key={item.id} state={item.id}><ListItem key={item.id}>{item.title}</ListItem></Link>)
                                                                })}
                                                        </UnorderedList>}
                                                    </ModalBody>
                                                    <ModalFooter>
                                                            <Button onClick={onClose}>Cancel</Button>
                                                    </ModalFooter>
                                       </ModalContent>
                                    </ModalOverlay>
                        </Modal>


                          <div className='App'>
                              <Container maxW="1200px" marginTop={'50px'}>
                                  <Routes>
                                      <Route path='/' element={<Main/>}/>
                                      <Route path='/contact' element={<Contact/>}/>
                                      <Route path=':slug' element={<SinglePost/>}/>
                                      <Route path='/404' element={<NotFound/>}/>
                                  </Routes>
                              </Container>
                          </div>
                    </BrowserRouter>

                    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>

                    </ThemeProvider>

    </ChakraProvider>
  );
}

export default App;
