import { theme } from "@chakra-ui/react";
import {createGlobalStyle} from "styled-components";


export const lightTheme = {
        body: "#fff",
        text: "#000",
        toggleBorder: "#FFF",
        gradient: "linear-gradient(#3959BA, #79D7ED)",
}

export const darkTheme = {
        body: "#363537",
        text: "#FAFAFA",
        toggleBorder: "#688096",
        gradient: "linear-gradient(#091236, #1E215D)",
}

export const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
        box-sizing:border-box;
}

body {
        align-items:center;
        background: ${({theme}) => theme && theme.body};
        color:${({theme}) => theme && theme.text};
        flex-direction:column;
        justify-content:center;
        font-family:Roboto,Helvetica, Arial, sans-serif;
        transition:all .25s linear;

}
`;
